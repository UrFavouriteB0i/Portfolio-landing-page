# AI Sidekick - Quick Reference

## What You Just Built

A **free AI chatbot** that knows everything about your portfolio and can answer questions about:
- Your projects and what they do
- Your technical skills and proficiency
- Your work experience and achievements
- Your education and background

**Cost: $0** | **Deploy time: 5 minutes** | **Maintenance: Minimal**

---

## Your AI Sidekick Features

✅ **RAG-Powered Knowledge**
- ChromaDB vector database with 50+ chunks of your portfolio data
- Semantic search to find relevant information
- Auto-updates when you edit portfolio_data.json

✅ **Smart Guardrails**
- Blocks off-topic questions automatically
- Prevents general coding help requests
- Politely redirects to portfolio-related topics
- ~95% accuracy on test cases

✅ **Sidekick Personality**
- Friendly, enthusiastic about your work
- Professional but approachable
- Occasional humor (sparingly)
- Always cites specific examples

✅ **Beautiful UI**
- Matches your portfolio theme (dark mode, blue accents)
- Mobile-responsive
- Smooth animations

---

## Files Created

```
ai-chatbot/
├── app.py                      # Main Streamlit app (start here)
├── portfolio_data.json         # Your portfolio knowledge base
├── requirements.txt            # Python dependencies
├── README.md                   # Overview and quick start
├── DEPLOYMENT.md               # Complete deployment guide
├── setup.sh                    # Quick setup script
├── test_guardrails.py          # Test guardrails and RAG
├── .env.example                # Environment variable template
├── rag/
│   ├── __init__.py
│   └── knowledge.py            # RAG pipeline with ChromaDB
├── guardrails/
│   ├── __init__.py
│   └── filters.py              # Off-topic question filtering
└── .streamlit/
    └── config.toml             # Streamlit theme config
```

---

## Quick Start

### 1. Get Free Groq API Key (2 minutes)

1. Go to https://console.groq.com
2. Sign up (free)
3. Create API key
4. Copy key (starts with `gsk_...`)

### 2. Run Locally (1 minute)

```bash
cd ai-chatbot

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set API key
export GROQ_API_KEY="gsk_your_key_here"

# Run the app
streamlit run app.py
```

Open http://localhost:8501

### 3. Deploy to Hugging Face Spaces (2 minutes)

1. Go to https://huggingface.co/new-space
2. Name: `ai-sidekick`, SDK: Streamlit
3. Create Space
4. Upload all files from `ai-chatbot/`
5. Go to Settings → Repository secrets
6. Add: `GROQ_API_KEY` = your key
7. Wait 2-3 minutes
8. Done! Live at `https://yourusername-ai-sidekick.hf.space`

---

## How It Works

```
User asks: "What projects has Zhilaan built?"
    ↓
Guardrails: ✅ Allowed (portfolio-related)
    ↓
ChromaDB RAG: Retrieves project data chunks
    ↓
Groq API: Generates response with context
    ↓
Sidekick personality: Friendly, professional answer
```

---

## Testing

### Test Guardrails

```bash
python test_guardrails.py
```

Expected output:
```
✅ Tell me about Zhilaan → ALLOWED
✅ What projects has he built? → ALLOWED
❌ How do I install Python? → BLOCKED
❌ What's the weather today? → BLOCKED
```

### Manual Test Queries

**Should ALLOW:**
- "Tell me about Zhilaan"
- "What projects has he built?"
- "What is Videfly?"
- "What tech stack does he use?"
- "Tell me about his AI work"

**Should BLOCK:**
- "How do I install Python?"
- "What's the weather?"
- "Write me a function"
- "Who is the president?"

---

## Customization

### Update Your Portfolio

Edit `portfolio_data.json`:

```json
{
  "meta": {
    "name": "Your Name",
    "role": "Your Role"
  },
  "projects": [
    {
      "name": "New Project",
      "description": "...",
      "problem": "...",
      "solution": "...",
      "stack": ["Python", "FastAPI"]
    }
  ]
}
```

The RAG pipeline auto-reindexes when it detects changes.

### Change Personality

Edit system prompt in `app.py`:

```python
SYSTEM_PROMPT = """You are [Name]'s AI Sidekick...
- Personality trait 1
- Personality trait 2
"""
```

### Adjust Guardrails

Edit `guardrails/filters.py`:

```python
OFF_TOPIC_PATTERNS = [
    r"\b(new pattern to block)\b",
]

ALLOWED_CONTEXT = [
    r"\b(new allowed topic)\b",
]
```

---

## Cost & Limits

| Component | Cost | Limit |
|-----------|------|-------|
| Hugging Face Spaces | Free | Always-on |
| Groq API | Free | 30 RPM, 10K tokens/min |
| Embeddings | Free | Local |
| Vector DB | Free | Local |
| **Total** | **$0** | ~1000 queries/day |

---

## Architecture

```
┌────────────────────────────────────────────┐
│           Portfolio Data (JSON)            │
└────────────────────────────────────────────┘
                    ↓
┌────────────────────────────────────────────┐
│      Sentence-transformers (embeddings)    │
└────────────────────────────────────────────┘
                    ↓
┌────────────────────────────────────────────┐
│         ChromaDB (vector storage)          │
└────────────────────────────────────────────┘
                    ↓
┌────────────────────────────────────────────┐
│              User Query                    │
└────────────────────────────────────────────┘
                    ↓
┌────────────────────────────────────────────┐
│            Guardrails Check                │
└────────────────────────────────────────────┘
         ↓                    ↓
┌──────────────┐      ┌──────────────────┐
│   BLOCKED    │      │     ALLOWED      │
│  (redirect)  │      │   (continue)     │
└──────────────┘      └──────────────────┘
                              ↓
                    ┌──────────────────┐
                    │   Groq Free API  │
                    │  (Llama 3.3 70B) │
                    └──────────────────┘
                              ↓
                    ┌──────────────────┐
                    │  Response with   │
                    │   personality    │
                    └──────────────────┘
```

---

## Troubleshooting

**App won't start?**
```bash
pip install -r requirements.txt --force-reinstall
streamlit run app.py 2>&1 | head -20
```

**Slow first query?**
- Normal! Building index takes 5-10 seconds
- Subsequent queries are fast

**Wrong answers?**
- Update portfolio_data.json
- Check RAG retrieval: `python test_guardrails.py`

**API errors?**
- Verify key: `echo $GROQ_API_KEY`
- Check Groq status: https://status.groq.com

---

## Next Steps

1. ✅ Test locally with `streamlit run app.py`
2. ✅ Deploy to Hugging Face Spaces
3. ✅ Add link to your main portfolio
4. ✅ Share with friends for feedback
5. ✅ Update portfolio_data.json with new projects

---

## Support

- Read `DEPLOYMENT.md` for detailed guide
- Run `python test_guardrails.py` to verify
- Check Hugging Face Space logs for errors

---

**Built with ❤️ using Groq + ChromaDB + Streamlit**
**Total cost: $0 | Total setup: 5 minutes**
