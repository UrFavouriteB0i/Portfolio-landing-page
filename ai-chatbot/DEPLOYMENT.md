# Complete Deployment Guide for AI Sidekick

## Overview

Your AI Sidekick is a RAG-powered chatbot that:
- Knows everything about your portfolio (projects, skills, experience)
- Has a friendly "sidekick" personality
- Blocks off-topic questions automatically
- Costs **$0** to run (uses free tiers)

## Quick Start (5 minutes)

### Step 1: Get Free Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up (free, takes 30 seconds)
3. Create API key
4. Copy the key (starts with `gsk_...`)

### Step 2: Test Locally

```bash
cd ai-chatbot

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set API key
export GROQ_API_KEY="gsk_your_key_here"  # Windows: set GROQ_API_KEY=...

# Run the app
streamlit run app.py
```

Open http://localhost:8501 and test it!

### Step 3: Deploy to Hugging Face Spaces (Free Hosting)

#### Option A: Upload via Web UI

1. Go to [huggingface.co/new-space](https://huggingface.co/new-space)
2. Fill in:
   - Name: `ai-sidekick` (or anything)
   - SDK: **Streamlit**
   - License: MIT
3. Click "Create Space"
4. Go to "Files" tab
5. Upload all files from `ai-chatbot/` directory
6. Go to "Settings" → "Repository secrets"
7. Add secret: `GROQ_API_KEY` = your API key
8. Wait 2-3 minutes for build to complete
9. Done! Your AI is live at `https://yourusername-ai-sidekick.hf.space`

#### Option B: Push via Git

```bash
# Clone your Space repo
git clone https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME

# Copy AI sidekick files
cp -r ai-chatbot/* YOUR_SPACE_NAME/

# Push
cd YOUR_SPACE_NAME
git add .
git commit -m "Deploy AI Sidekick"
git push
```

Then add the secret in Settings as shown above.

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  User Query                     │
└─────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────┐
│              Guardrails Check                    │
│  • Keyword filtering (fast)                      │
│  • Semantic relevance (embedding similarity)     │
└─────────────────────────────────────────────────┘
                       ↓
        ┌──────────────┴──────────────┐
        ↓                              ↓
┌──────────────┐              ┌──────────────┐
│  OFF-TOPIC   │              │   IN-SCOPE   │
│   Redirect   │              │  (continue)  │
└──────────────┘              └──────────────┘
                                      ↓
                       ┌──────────────┴──────────────┐
                       ↓                              ↓
              ┌────────────────┐            ┌────────────────┐
              │  ChromaDB RAG  │            │  Groq Free API │
              │  (retrieve     │            │  (Llama 3.3    │
              │   context)     │            │   70B)         │
              └────────────────┘            └────────────────┘
                       │                              │
                       └──────────────┬──────────────┘
                                      ↓
                       ┌─────────────────────────────┐
                       │   Response with personality  │
                       └─────────────────────────────┘
```

## Cost Breakdown

| Component | Cost | Limits |
|-----------|------|--------|
| Hugging Face Spaces | Free | Always-on, 2 CPU cores |
| Groq API | Free | 30 RPM, 10K tokens/min |
| ChromaDB | Free | Local file storage |
| Sentence-transformers | Free | Runs locally |
| **Total** | **$0** | Enough for portfolio traffic |

## Customization

### 1. Update Your Portfolio Data

Edit `portfolio_data.json`:

```json
{
  "meta": {
    "name": "Your Name",
    "role": "Your Role",
    ...
  },
  "projects": [
    {
      "name": "Project Name",
      "description": "...",
      ...
    }
  ],
  "skills": {
    "core_ai_ml": ["Skill1", "Skill2"],
    ...
  }
}
```

The RAG pipeline will automatically re-index when it detects changes.

### 2. Adjust Guardrails

Edit `guardrails/filters.py`:

```python
# Add more off-topic patterns
OFF_TOPIC_PATTERNS = [
    r"\b(your pattern here)\b",
]

# Add allowed topics
ALLOWED_CONTEXT = [
    r"\b(allowed keyword)\b",
]
```

### 3. Change Personality

Edit the system prompt in `app.py`:

```python
SYSTEM_PROMPT = """
You are [Your Name]'s AI Sidekick...

PERSONALITY TRAITS:
- [Your desired traits]
...
"""
```

## Testing

### Test Guardrails

```bash
python test_guardrails.py
```

This verifies that:
- ✅ Portfolio questions are allowed
- ✅ Off-topic questions are blocked
- ✅ RAG retrieval works correctly

### Manual Testing

Try these queries:
- ✅ "Tell me about Zhilaan"
- ✅ "What projects has he built?"
- ✅ "What tech stack does he use?"
- 🚫 "How do I install Python?" (should be blocked)
- 🚫 "What's the weather?" (should be blocked)

## Monitoring

### Check Logs (Hugging Face)

1. Go to your Space
2. Click "Logs" tab
3. Monitor for errors

### Check Usage (Groq)

1. Go to [console.groq.com](https://console.groq.com)
2. Click "Usage" tab
3. Monitor API calls

## Upgrading

### If Traffic Grows

- **Groq Paid Tier**: $0.05/1M tokens (very cheap)
- **Hugging Face Pro**: $9/month (better hardware)
- **Upgrade Vector DB**: Move to Pinecone/Weaviate for better scale

### If You Need More Features

- **Conversation Memory**: Add Redis for session persistence
- **Feedback System**: Add thumbs up/down buttons
- **Analytics**: Track which questions users ask
- **Multi-language**: Add language detection and translation

## Troubleshooting

### App Won't Start

```bash
# Check Python version (need 3.8+)
python --version

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Check for errors
streamlit run app.py 2>&1 | head -20
```

### API Key Issues

```bash
# Verify key is set
echo $GROQ_API_KEY  # Should show your key

# Test key directly
curl -H "Authorization: Bearer $GROQ_API_KEY" https://api.groq.com/v1/models
```

### Slow Responses

- First query is slow (building index) — subsequent queries are fast
- If consistently slow, check Groq status: [status.groq.com](https://status.groq.com)

### Wrong Answers

- Update `portfolio_data.json` with accurate information
- RAG retrieves what's in your knowledge base
- If data is correct but answers are wrong, adjust system prompt

## Security Notes

- ✅ API key stored in environment variable (not in code)
- ✅ No user data stored (stateless)
- ✅ Guardrails prevent misuse
- ✅ No PII exposed (only what you put in portfolio_data.json)

## Next Steps

After deploying:

1. ✅ Test with real questions
2. ✅ Share with friends for feedback
3. ✅ Add link to your main portfolio
4. ✅ Monitor usage and adjust guardrails
5. ✅ Update portfolio_data.json as you build new projects

## Support

If you have issues:
- Check this README
- Run `python test_guardrails.py`
- Check Hugging Face Space logs
- Open issue on GitHub

---

**Total setup time: ~5 minutes**
**Total cost: $0**
**Maintenance: Minimal** (just update portfolio_data.json when you have new projects)
