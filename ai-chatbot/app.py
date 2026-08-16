"""
HF Space — Gradio ChatInterface (standalone)
=============================================
Self-contained Gradio app for HF Spaces.
Does NOT import from server.py to avoid FastAPI/Gradio ASGI conflicts.
server.py stays for local dev only.
"""

import os
from pathlib import Path

import gradio as gr
from groq import Groq

from rag.knowledge import build_index, retrieve
from guardrails.filters import check_guardrails

# ── Secret reader (duplicated from server.py to avoid import) ──
def _read_secret(name: str) -> str:
    secret_path = Path(f"/etc/secrets/{name}")
    if secret_path.exists():
        return secret_path.read_text().strip()
    return os.getenv(name, "")


# ── System Prompt ──
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


# ── Init ──
build_index()
groq_client = Groq(api_key=_read_secret("GROQ_API_KEY"))


# ── Chat function ──
def chat(message: str, history: list) -> str:
    """type="messages" → history = [{"role": "user"/"assistant", "content": "..."}, ...]"""
    message = message.strip()
    if not message:
        return "Please send a message."

    is_allowed, redirect_msg = check_guardrails(message)
    if not is_allowed:
        return redirect_msg

    context_docs = retrieve(message, n_results=5)
    context = "\n".join(context_docs)

    messages = [
        {"role": "system", "content": f"{SYSTEM_PROMPT}\n\nRELEVANT CONTEXT:\n{context}"},
    ]
    for msg in history:
        messages.append({"role": msg["role"], "content": msg["content"]})
    messages.append({"role": "user", "content": message})

    try:
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            max_tokens=800,
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception:
        return "Sorry, something went wrong. Try again in a moment."


# ── Gradio App ──
css = """
#chatbot { height: 600px; }
footer { display: none !important; }
"""

demo = gr.ChatInterface(
    fn=chat,
    type="messages",
    title="🤖 Zhilaan's AI Sidekick",
    description="Ask me about Zhilaan's projects, skills, or experience.",
    examples=[
        "What does Zhilaan build?",
        "Tell me about his Videfly experience",
        "What tech stack does he use?",
    ],
    theme=gr.themes.Soft(),
    css=css,
)

if __name__ == "__main__":
    demo.launch()
