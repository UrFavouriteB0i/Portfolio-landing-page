"""
Portfolio Knowledge Base — ChromaDB RAG pipeline
Loads portfolio_data.json, chunks it, embeds with fastembed (ONNX),
and stores in a persistent ChromaDB collection for retrieval.
"""

import json
import os
from pathlib import Path
from typing import List, Dict

import chromadb
from chromadb.config import Settings
from fastembed import TextEmbedding

# ---------- Config ----------
DATA_DIR = Path(__file__).parent
CHROMA_DIR = DATA_DIR.parent / "chroma_db"
EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

# ---------- Globals (lazy init) ----------
_client: chromadb.ClientAPI | None = None
_collection: chromadb.Collection | None = None
_model: TextEmbedding | None = None


def _get_model() -> TextEmbedding:
    global _model
    if _model is None:
        _model = TextEmbedding(EMBED_MODEL)
    return _model


def _get_collection() -> chromadb.Collection:
    global _client, _collection
    if _collection is None:
        _client = chromadb.PersistentClient(
            path=str(CHROMA_DIR),
            settings=Settings(anonymized_telemetry=False),
        )
        _collection = _client.get_or_create_collection(
            name="portfolio_knowledge",
            metadata={"hnsw:space": "cosine"},
        )
    return _collection


# ---------- Document Chunking ----------

def _flatten_portfolio(data: Dict) -> List[Dict[str, str]]:
    """
    Flatten the portfolio JSON into semantic chunks, each tagged with
    a section label and source path so the LLM can cite them.
    """
    chunks: List[Dict[str, str]] = []
    meta = data.get("meta", {})

    # Helper to register a chunk
    def add(section: str, text: str):
        text = text.strip()
        if text:
            chunks.append({"id": f"{section}_{len(chunks)}", "text": text, "section": section})

    # --- Meta ---
    name = meta.get("name", "")
    role = meta.get("role", "")
    add("identity", f"{name} is an {role} based in {meta.get('location', '')}. Email: {meta.get('email', '')}. Portfolio: {meta.get('portfolio', '')}. GitHub: {meta.get('github', '')}.")

    # --- About ---
    about = data.get("about", {})
    add("about", f"About: {about.get('summary', '')} {about.get('detailed', '')}")
    add("about", f"Passion: {about.get('passion', '')}")

    # --- Current role ---
    cr = data.get("current_role", {})
    add("current_role", f"Currently {cr.get('title', '')} at {cr.get('company', '')} ({cr.get('period', '')}).")
    for ach in cr.get("achievements", []):
        add("current_role", f"Achievement at {cr.get('company', '')}: {ach}")
    add("current_role", f"Products at {cr.get('company', '')}: {', '.join(cr.get('products', []))}.")
    add("current_role", f"Tech stack at {cr.get('company', '')}: {', '.join(cr.get('stack', []))}.")

    # --- Past experience ---
    for exp in data.get("experience", []):
        co = exp.get("company", "")
        add("experience", f"{exp.get('title', '')} at {co} ({exp.get('period', '')}).")
        for ach in exp.get("achievements", []):
            add("experience", f"Achievement at {co}: {ach}")
        add("experience", f"Tech used at {co}: {', '.join(exp.get('stack', []))}.")

    # --- Education ---
    edu = data.get("education", {})
    honors = " with Honors" if edu.get("honors") else ""
    add("education", f"{edu.get('degree', '')} from {edu.get('university', '')} ({edu.get('period', '')}), GPA {edu.get('gpa', '')}{honors}.")
    add("education", f"Thesis: {edu.get('thesis', '')}")

    # --- Skills ---
    skills = data.get("skills", {})
    for cat, items in skills.items():
        add("skills", f"{cat.replace('_', ' ').title()}: {', '.join(items)}.")

    # --- Projects ---
    for proj in data.get("projects", []):
        add("project", f"{proj['name']} ({proj.get('type', '')}): {proj.get('description', '')}")
        add("project", f"Problem for {proj['name']}: {proj.get('problem', '')}")
        add("project", f"Solution for {proj['name']}: {proj.get('solution', '')}")
        add("project", f"Tech stack for {proj['name']}: {', '.join(proj.get('stack', []))}.")

    # --- Achievements ---
    achs = data.get("achievements", {})
    add("achievements", f"Key metrics: {'; '.join(achs.get('metrics', []))}")
    add("achievements", f"Highlights: {'; '.join(achs.get('highlights', []))}")

    return chunks


# ---------- Public API ----------

def build_index():
    """
    (Re-)build the ChromaDB index from portfolio_data.json.
    Called once on first query or manually.
    """
    collection = _get_collection()
    model = _get_model()

    with open(DATA_DIR / "portfolio_data.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    chunks = _flatten_portfolio(data)
    if collection.count() >= len(chunks):
        return  # already indexed

    ids = [c["id"] for c in chunks]
    texts = [c["text"] for c in chunks]
    metadatas = [{"section": c["section"]} for c in chunks]
    embeddings = [emb.tolist() for emb in model.embed(texts)]

    collection.upsert(ids=ids, documents=texts, embeddings=embeddings, metadatas=metadatas)


def retrieve(query: str, n_results: int = 5) -> List[str]:
    """
    Retrieve the most relevant chunks for a user query.
    Returns a list of text strings (most relevant first).
    """
    build_index()  # no-op if already indexed
    collection = _get_collection()
    model = _get_model()

    query_emb = list(model.embed([query]))[0].tolist()
    results = collection.query(
        query_embeddings=query_emb,
        n_results=n_results,
        include=["documents", "metadatas", "distances"],
    )

    documents = results.get("documents", [[]])[0]
    return documents


def get_portfolio_summary() -> str:
    """
    Return a compact portfolio summary for system prompt injection.
    """
    with open(DATA_DIR / "portfolio_data.json", "r", encoding="utf-8") as f:
        data = json.load(f)

    sections = []
    meta = data.get("meta", {})
    sections.append(f"Name: {meta.get('name')} | Role: {meta.get('role')} | Location: {meta.get('location')}")

    cr = data.get("current_role", {})
    sections.append(f"Current: {cr.get('title')} at {cr.get('company')} ({cr.get('period')})")

    skills = data.get("skills", {})
    flat = []
    for items in skills.values():
        flat.extend(items)
    sections.append(f"Skills: {', '.join(flat)}")

    projects = data.get("projects", [])
    proj_names = [p["name"] for p in projects]
    sections.append(f"Projects: {', '.join(proj_names)}")

    return "\n".join(sections)


if __name__ == "__main__":
    build_index()
    print(f"Index built with {_get_collection().count()} chunks.")
    print("\nTest retrieval: 'What does Zhilaan do?'")
    for r in retrieve("What does Zhilaan do?"):
        print(f"  - {r[:120]}...")
