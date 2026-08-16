"""
Portfolio Chat API — Vercel Serverless Function
================================================
Lightweight version using BM25 retrieval instead of ChromaDB + fastembed.
Keeps the same chatbot personality and guardrails.

Routes:
  POST /api/chat    — Send a message, get a response
  GET  /api/health  — Health check
"""

import json
import math
import os
import re
import sys
from collections import Counter
from pathlib import Path
from typing import List, Tuple

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from pydantic import BaseModel

# ─────────────────────────────────────────────
# Paths
# ─────────────────────────────────────────────
PROJECT_ROOT = Path(__file__).parent.parent
PORTFOLIO_DATA = PROJECT_ROOT / "ai-chatbot" / "rag" / "portfolio_data.json"

# ─────────────────────────────────────────────
# System Prompt (Sidekick Personality)
# ─────────────────────────────────────────────
SYSTEM_PROMPT = """You are Zhilaan's sidekick — his digital twin on his portfolio website. You know everything about Zhilaan: his projects, skills, work experience, education, and personality. You talk about him the way a close colleague or friend would.

HOW TO TALK:
- Speak naturally, like you're having a real conversation — not reciting a résumé.
- NEVER dump information as bullet-point lists or structured markdown. Instead, weave facts into sentences the way a person would.
- Vary your response style: sometimes a short punchy answer, sometimes a longer story. Mix it up.
- Share details conversationally. Instead of "Skills: Python, FastAPI, Kafka" say something like "Zhilaan works primarily with Python — FastAPI for APIs, Kafka for async pipelines."
- Use casual warmth. You can use "!" for emphasis and the occasional friendly touch, but don't overdo emojis.
- If the question is vague, pick the most interesting angle and run with it. Don't ask "what specifically do you want to know?" — just give a good answer.
- Keep responses to 2-5 short paragraphs. Don't ramble, but don't be terse either.

WHEN ANSWERING:
- Highlight impact and results when relevant (e.g., "cut generation time 3-4x", "serves 2,500 users daily").
- Connect facts to a bigger picture — don't just name technologies, explain why they matter.
- If someone asks in Bahasa Indonesia, answer in Bahasa Indonesia naturally — don't mix languages unless the question does.
- If someone asks a follow-up ("tell me more", "what about that?"), dive deeper instead of repeating what you already said.

BOUNDARIES:
- ONLY talk about Zhilaan — his work, skills, experience, and portfolio.
- If someone asks something completely unrelated (coding help, weather, general knowledge), gently redirect them: "I'm all about Zhilaan's work! Try asking me about his projects or experience."
- Never make things up. If you genuinely don't know, say you're not sure and suggest they reach out to Zhilaan directly.

EXAMPLE OF HOW TO SOUND:
User: "What does Zhilaan do?"
Bad: "Zhilaan is an AI Software Engineer. Skills: Python, FastAPI, Kafka. Experience: Videfly, Freelance, Festo."
Good: "Zhilaan builds AI systems — right now he's the AI Software Engineer at Videfly, where he's been owning a Kafka-based multimodal generation platform. It processes around a thousand jobs a day and he's gotten the generation time down from 5-7 minutes to about 1-2. Before that he did edge AI freelance work and interned at Festo doing industrial computer vision. The guy's basically lived at the intersection of AI and production engineering." """


# ─────────────────────────────────────────────
# Lightweight BM25-style RAG (no ML deps)
# ─────────────────────────────────────────────

def _tokenize(text: str) -> List[str]:
    """Simple tokenizer: lowercase, split on non-alphanumeric, remove short tokens."""
    return [w for w in re.split(r"\W+", text.lower()) if len(w) > 2]


def _flatten_portfolio(data: dict) -> List[str]:
    """Flatten portfolio JSON into text chunks (same logic as rag/knowledge.py)."""
    chunks: List[str] = []
    meta = data.get("meta", {})

    def add(text: str):
        text = text.strip()
        if text:
            chunks.append(text)

    # Identity
    add(f"{meta.get('name', '')} is an {meta.get('role', '')} based in {meta.get('location', '')}. "
        f"Email: {meta.get('email', '')}. Portfolio: {meta.get('portfolio', '')}. GitHub: {meta.get('github', '')}.")

    # About
    about = data.get("about", {})
    add(f"About: {about.get('summary', '')} {about.get('detailed', '')}")
    add(f"Passion: {about.get('passion', '')}")

    # Current role
    cr = data.get("current_role", {})
    add(f"Currently {cr.get('title', '')} at {cr.get('company', '')} ({cr.get('period', '')}).")
    for ach in cr.get("achievements", []):
        add(f"Achievement at {cr.get('company', '')}: {ach}")
    add(f"Products at {cr.get('company', '')}: {', '.join(cr.get('products', []))}.")
    add(f"Tech stack at {cr.get('company', '')}: {', '.join(cr.get('stack', []))}.")

    # Past experience
    for exp in data.get("experience", []):
        co = exp.get("company", "")
        add(f"{exp.get('title', '')} at {co} ({exp.get('period', '')}).")
        for ach in exp.get("achievements", []):
            add(f"Achievement at {co}: {ach}")
        add(f"Tech used at {co}: {', '.join(exp.get('stack', []))}.")

    # Education
    edu = data.get("education", {})
    honors = " with Honors" if edu.get("honors") else ""
    add(f"{edu.get('degree', '')} from {edu.get('university', '')} ({edu.get('period', '')}), "
        f"GPA {edu.get('gpa', '')}{honors}.")
    add(f"Thesis: {edu.get('thesis', '')}")

    # Skills
    skills = data.get("skills", {})
    for cat, items in skills.items():
        add(f"{cat.replace('_', ' ').title()}: {', '.join(items)}.")

    # Projects
    for proj in data.get("projects", []):
        add(f"{proj['name']} ({proj.get('type', '')}): {proj.get('description', '')}")
        add(f"Problem for {proj['name']}: {proj.get('problem', '')}")
        add(f"Solution for {proj['name']}: {proj.get('solution', '')}")
        add(f"Tech stack for {proj['name']}: {', '.join(proj.get('stack', []))}.")

    # Achievements
    achs = data.get("achievements", {})
    add(f"Key metrics: {'; '.join(achs.get('metrics', []))}")
    add(f"Highlights: {'; '.join(achs.get('highlights', []))}")

    return chunks


class BM25Index:
    """Minimal BM25 retrieval — no external dependencies."""

    def __init__(self, documents: List[str], k1: float = 1.5, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.documents = documents
        self.doc_tokens = [_tokenize(doc) for doc in documents]
        self.doc_freqs: List[Counter] = [Counter(tokens) for tokens in self.doc_tokens]
        self.doc_lens = [len(tokens) for tokens in self.doc_tokens]
        self.avg_dl = sum(self.doc_lens) / len(self.doc_lens) if self.doc_lens else 1
        self.N = len(documents)

        # Build inverted index
        self.df: Counter = Counter()
        for freq in self.doc_freqs:
            for word in freq:
                self.df[word] += 1

    def _idf(self, word: str) -> float:
        n = self.df.get(word, 0)
        return math.log((self.N - n + 0.5) / (n + 0.5) + 1)

    def search(self, query: str, top_k: int = 5) -> List[str]:
        query_tokens = _tokenize(query)
        if not query_tokens:
            return self.documents[:top_k]

        scores = []
        for i in range(self.N):
            score = 0.0
            dl = self.doc_lens[i]
            for word in query_tokens:
                tf = self.doc_freqs[i].get(word, 0)
                idf = self._idf(word)
                numerator = tf * (self.k1 + 1)
                denominator = tf + self.k1 * (1 - self.b + self.b * dl / self.avg_dl)
                score += idf * numerator / denominator
            scores.append((score, i))

        scores.sort(reverse=True)
        return [self.documents[idx] for _, idx in scores[:top_k]]


# ─────────────────────────────────────────────
# Build index on cold start
# ─────────────────────────────────────────────

_chunks: List[str] = []
_bm25: BM25Index | None = None


def _ensure_index():
    global _chunks, _bm25
    if _bm25 is not None:
        return
    with open(PORTFOLIO_DATA, "r", encoding="utf-8") as f:
        data = json.load(f)
    _chunks = _flatten_portfolio(data)
    _bm25 = BM25Index(_chunks)


# ─────────────────────────────────────────────
# Guardrails (keyword-only, lightweight)
# ─────────────────────────────────────────────

ALLOWED_CONTEXT = [
    r"\b(zhilaan|rusmawan|portfolio|videfly|his|her|the portfolio)\b",
    r"\b(project|projects|work|experience|skill|skills|tech|stack|background)\b",
    r"\b(education|university|thesis|intern|engineer|role|job)\b",
    r"\b(python|kafka|fastapi|redis|docker|aws|gcp|llm|ai|ml)\b",
    r"\b(robot|computer.?vision|edge|cloud|pipeline|model)\b",
    r"\b(tell me (more|about)|explain|describe|what (does|is|are)|how (does|did))\b",
    r"\b(deeper|details|elaborate|specifics|example)\b",
    r"\b(proyek|pengalaman|keahlian|skill|teknologi|pendidikan|kuliah|kampus)\b",
    r"\b(bekerja|kerja|posisi|peran|magang|intern)\b",
    r"\b(tentang|ceritakan|jelaskan|apa (itu|yang)|bagaimana)\b",
    r"\b(lebih (dalam|lanjut|rinci)|detail|contoh|spesifik)\b",
    r"\b(project|portfolio|videfly|engineer|developer)\b",
]

OFF_TOPIC_PATTERNS = [
    r"^(write|create|build|debug|fix|refactor) (me |my )?.*\b(code|function|script|program|app|website)\b",
    r"^(help me )?(write|create|build|fix) (me |my |the )?.*\b(homework|assignment|essay|thesis|report)\b",
    r"^(what is (the )?(weather|temperature|time|date|day))",
    r"^(who is (the )?(president|ceo|founder) of (?!videfly))",
    r"^(how (do|can) (i|we) (get rich|make money|win|cheat))",
    r"^(can you (send|email|call|message|contact))",
    r"^(where (do|does) (you|he|she) (live|work|study))\b(?!.*zhilaan)",
    r"\b(homework|assignment|essay|cheat|exam answers)\b",
]

REDIRECT_MESSAGE = """Hey, I'm Zhilaan's portfolio sidekick! 👋

I'm here to tell you about his work, projects, and experience in AI engineering.

**Try asking:**
- "What projects has Zhilaan built?"
- "Tell me about his Videfly experience"
- "What tech stack does he use?"

I can also dive deeper into any topic — just ask for more details!"""


def check_guardrails(query: str) -> Tuple[bool, str | None]:
    """Keyword-based guardrail check. Off-topic patterns checked FIRST."""
    query_lower = query.lower().strip()
    if len(query_lower) < 3:
        return False, REDIRECT_MESSAGE

    # Block off-topic requests first, regardless of keyword matches
    for pattern in OFF_TOPIC_PATTERNS:
        if re.search(pattern, query_lower):
            return False, REDIRECT_MESSAGE

    for pattern in ALLOWED_CONTEXT:
        if re.search(pattern, query_lower):
            return True, None

    return True, None


# ─────────────────────────────────────────────
# Groq client
# ─────────────────────────────────────────────

def _read_secret(name: str) -> str:
    return os.getenv(name, "")


groq_client = Groq(api_key=_read_secret("GROQ_API_KEY"))

# Build BM25 index on cold start
_ensure_index()


# ─────────────────────────────────────────────
# FastAPI App
# ─────────────────────────────────────────────

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000",
).split(",")

app = FastAPI(title="Portfolio Chat API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []


class ChatResponse(BaseModel):
    response: str
    blocked: bool = False


@app.get("/api/health")
def health_check():
    groq_ok = bool(_read_secret("GROQ_API_KEY"))
    return {
        "status": "ok",
        "groq_configured": groq_ok,
        "index_ready": _bm25 is not None,
        "chunk_count": len(_chunks),
    }


@app.get("/api")
def root_check():
    return {"status": "ok", "service": "portfolio-chat-api"}


@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    message = req.message.strip()

    if not message:
        return ChatResponse(response="Please send a message.", blocked=True)

    # Step 1: Guardrails check
    is_allowed, redirect_msg = check_guardrails(message)
    if not is_allowed:
        return ChatResponse(response=redirect_msg, blocked=True)

    # Step 2: Retrieve context via BM25
    context_docs = _bm25.search(message, top_k=5)
    context = "\n".join(context_docs)

    # Step 3: Build messages for Groq
    messages = [
        {"role": "system", "content": f"{SYSTEM_PROMPT}\n\nRELEVANT CONTEXT:\n{context}"},
    ]

    for msg in req.history:
        if msg.get("role") in ("user", "assistant"):
            messages.append({"role": msg["role"], "content": msg["content"]})

    messages.append({"role": "user", "content": message})

    # Step 4: Call Groq
    try:
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            max_tokens=800,
            temperature=0.7,
        )
        text = response.choices[0].message.content
        return ChatResponse(response=text, blocked=False)
    except Exception as e:
        import logging
        logging.error(f"Groq API error: {e}")
        return ChatResponse(
            response="Sorry, something went wrong. Try again in a moment.",
            blocked=False,
        )
