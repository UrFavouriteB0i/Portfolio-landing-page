"""
Portfolio Chat API — FastAPI server
====================================
Replaces the Streamlit app. Exposes POST /api/chat for the React frontend.
Uses RAG (ChromaDB + sentence-transformers) + guardrails + Groq free API.
"""

import os
from contextlib import asynccontextmanager
from pathlib import Path
from typing import List

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from guardrails.filters import check_guardrails
from pydantic import BaseModel
from rag.knowledge import build_index, retrieve

# Load .env from the ai-chatbot directory (where server.py lives)
load_dotenv(Path(__file__).parent / ".env")


def _read_secret(name: str, fallback_env: str = "") -> str:
    """
    Read a secret key with platform-aware fallback:
    1. Render: reads from /etc/secrets/<filename>
    2. HF Spaces: reads from env var (set via Settings → Secrets)
    3. Local dev: reads from .env file
    """
    # Render secret files
    secret_path = Path(f"/etc/secrets/{name}")
    if secret_path.exists():
        return secret_path.read_text().strip()
    # HF Spaces + local .env
    return os.getenv(fallback_env or name, "")

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
# Pydantic Models
# ─────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str
    history: List[dict] = []


class ChatResponse(BaseModel):
    response: str
    blocked: bool = False


# ─────────────────────────────────────────────
# Groq Client (created once)
# ─────────────────────────────────────────────

groq_client = Groq(api_key=_read_secret("GROQ_API_KEY"))


# ─────────────────────────────────────────────
# Lifespan — build index on startup
# ─────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    build_index()
    yield


# ─────────────────────────────────────────────
# FastAPI App
# ─────────────────────────────────────────────

ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:5173,http://localhost:3000",
).split(",")

app = FastAPI(title="Portfolio Chat API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


# ─────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────

@app.get("/api/health")
def health_check():
    """Health check + wake-up endpoint. Used by frontend to pre-warm Render."""
    groq_ok = bool(_read_secret("GROQ_API_KEY"))
    index_ok = (Path(__file__).parent / "chroma_db").exists()
    return {
        "status": "ok",
        "groq_configured": groq_ok,
        "index_ready": index_ok,
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

    # Step 2: Retrieve RAG context
    context_docs = retrieve(message, n_results=5)
    context = "\n".join(context_docs)

    # Step 3: Build messages for Groq
    messages = [
        {"role": "system", "content": f"{SYSTEM_PROMPT}\n\nRELEVANT CONTEXT:\n{context}"},
    ]

    # Add conversation history (user/assistant only)
    for msg in req.history:
        if msg.get("role") in ("user", "assistant"):
            messages.append({"role": msg["role"], "content": msg["content"]})

    # Add the new user message
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
            response=f"Sorry, I encountered an error: {str(e)[:200]}",
            blocked=False,
        )
