"""
HF Space — Gradio ChatInterface
================================
Wraps the chatbot logic in a Gradio app so HF Spaces can route requests.
server.py stays unchanged for local dev (FastAPI).
"""

import os
from pathlib import Path

import gradio as gr
from groq import Groq

# Import shared logic from server
from server import SYSTEM_PROMPT, _read_secret
from rag.knowledge import build_index, retrieve
from guardrails.filters import check_guardrails

# ── Build index on startup ──
build_index()

# ── Groq client ──
groq_client = Groq(api_key=_read_secret("GROQ_API_KEY"))


def chat(message: str, history: list) -> str:
    """Handle a chat turn. history = [[user, bot], ...]"""
    message = message.strip()
    if not message:
        return "Please send a message."

    # Guardrails
    is_allowed, redirect_msg = check_guardrails(message)
    if not is_allowed:
        return redirect_msg

    # RAG retrieval
    context_docs = retrieve(message, n_results=5)
    context = "\n".join(context_docs)

    # Build Groq messages
    messages = [
        {"role": "system", "content": f"{SYSTEM_PROMPT}\n\nRELEVANT CONTEXT:\n{context}"},
    ]
    for pair in history:
        if pair[0]:
            messages.append({"role": "user", "content": pair[0]})
        if pair[1]:
            messages.append({"role": "assistant", "content": pair[1]})
    messages.append({"role": "user", "content": message})

    # Call Groq
    try:
        response = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            max_tokens=800,
            temperature=0.7,
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Sorry, something went wrong. Try again in a moment."


# ── Gradio App ──
css = """
#chatbot { height: 600px; }
footer { display: none !important; }
"""

demo = gr.ChatInterface(
    fn=chat,
    type="tuples",
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
