"""
Guardrails — filter off-topic / irrelevant questions.

Strategy:
  1. Keyword-based fast reject (no LLM call needed)
  2. Semantic similarity check (embedding cosine distance)

If the question is outside scope, the chatbot returns a polite
redirect message that keeps it in-character as a portfolio sidekick.

Supports:
  - English and Bahasa Indonesia
  - Deep-dive follow-up questions
  - Lenient filtering for portfolio-related topics
"""

import re
from typing import Tuple

from rag.knowledge import retrieve

# ---------- Config ----------

# Keywords that ARE allowed (checked first — fast pass)
# Include both English and Indonesian
ALLOWED_CONTEXT = [
    # English - Portfolio topics
    r"\b(zhilaan|rusmawan|portfolio|videfly|his|her|the portfolio)\b",
    r"\b(project|projects|work|experience|skill|skills|tech|stack|background)\b",
    r"\b(education|university|thesis|intern|engineer|role|job)\b",
    r"\b(python|kafka|fastapi|redis|docker|aws|gcp|llm|ai|ml)\b",
    r"\b(robot|computer.?vision|edge|cloud|pipeline|model)\b",
    r"\b(tell me (more|about)|explain|describe|what (does|is|are)|how (does|did))\b",
    r"\b(deeper|details|elaborate|specifics|example)\b",

    # Bahasa Indonesia - Portfolio topics
    r"\b(proyek|pengalaman|keahlian|skill|teknologi|pendidikan|kuliah|kampus)\b",
    r"\b(bekerja|kerja|posisi|peran|magang|intern)\b",
    r"\b(tentang|ceritakan|jelaskan|apa (itu|yang)|bagaimana)\b",
    r"\b(lebih (dalam|lanjut|rinci)|detail|contoh|spesifik)\b",
    r"\b(project|portfolio|videfly|engineer|developer)\b",
]

# Keywords that strongly signal off-topic (checked only if not in allowed list)
OFF_TOPIC_PATTERNS = [
    # Clearly off-topic coding help (very specific patterns only)
    r"^(write|create|build|debug|fix|refactor) (me )?(a |an |the )?(full |complete )?(code|function|script|program|app|website)",
    r"^(help me )?(write|create|build) (my |the )?(homework|assignment|essay|thesis|report)",

    # Clearly off-topic general knowledge
    r"^(what is (the )?(weather|temperature|time|date|day))",
    r"^(who is (the )?(president|ceo|founder) of (?!videfly))",
    r"^(how (do|can) (i|we) (get rich|make money|win|cheat))",

    # Clearly off-topic personal requests
    r"^(can you (send|email|call|message|contact))",
    r"^(where (do|does) (you|he|she) (live|work|study))\b(?!.*zhilaan)",
]

# Fallback redirect message (bilingual)
REDIRECT_MESSAGE = """Hey, I'm Zhilaan's portfolio sidekick! 👋

I'm here to tell you about his work, projects, and experience in AI engineering.

**Try asking:**
- "What projects has Zhilaan built?"
- "Tell me about his Videfly experience"
- "What tech stack does he use?"
- "Ceritakan tentang proyek AI-nya" (Indonesian)

I can also dive deeper into any topic — just ask for more details!"""


# ---------- Checks ----------

def _keyword_check(query: str) -> Tuple[bool, str | None]:
    """
    Fast keyword-based check. Returns (is_allowed, None) or (False, reason).

    Strategy: Allow if it matches ANY allowed pattern, then only block
    if it matches an off-topic pattern.
    """
    query_lower = query.lower().strip()

    # Very short queries (< 3 chars) — likely typos
    if len(query_lower) < 3:
        return False, "Query too short to be meaningful."

    # Check allowed context first (if matches, immediately allow)
    for pattern in ALLOWED_CONTEXT:
        if re.search(pattern, query_lower):
            return True, None

    # Check off-topic patterns (only blocks if explicitly off-topic)
    for pattern in OFF_TOPIC_PATTERNS:
        if re.search(pattern, query_lower):
            return False, None  # Don't show reason to user

    # Default: ALLOW if not explicitly blocked
    # This is the key change — permissive by default
    return True, None


def _relevance_check(query: str) -> Tuple[bool, float]:
    """
    Semantic similarity check using retrieved chunks.
    Returns (is_relevant, avg_distance).

    Very lenient — only blocks completely irrelevant queries.
    """
    results = retrieve(query, n_results=3)
    if not results:
        return False, 1.0

    # Check if any chunk contains keywords from the query
    query_words = set(query.lower().split())

    # Remove common stop words that don't indicate relevance
    stop_words = {"the", "a", "an", "is", "are", "was", "were", "what", "how",
                  "why", "when", "where", "who", "which", "this", "that",
                  "and", "or", "but", "in", "on", "at", "to", "for", "of",
                  "with", "by", "from", "it", "its", "do", "does", "did",
                  "apa", "itu", "yang", "dan", "atau", "di", "untuk", "dengan"}
    query_words -= stop_words

    for doc in results:
        doc_words = set(doc.lower().split())
        overlap = query_words & doc_words
        if len(overlap) >= 1:  # Just 1 shared word is enough
            return True, 0.0

    # If low overlap, check if query is about portfolio topics
    portfolio_keywords = {
        "zhilaan", "videfly", "project", "ai", "ml", "python",
        "kafka", "fastapi", "robot", "vision", "llm", "skill",
        "experience", "work", "education", "engineer", "pipeline",
        "edge", "cloud", "aws", "gcp", "docker", "redis",
        # Indonesian keywords
        "proyek", "pengalaman", "keahlian", "teknologi", "kerja",
        "tentang", "ceritakan", "jelaskan", "project", "portfolio",
    }
    if query_words & portfolio_keywords:
        return True, 0.0

    # Lenient default: allow if it's a reasonable length
    if len(query_words) >= 2:
        return True, 0.0

    return False, 0.8


def check_guardrails(query: str) -> Tuple[bool, str | None]:
    """
    Main guardrail check. Returns (is_allowed, redirect_message_or_None).

    Very permissive — only blocks clearly off-topic requests.
    """
    # Step 1: Keyword check (fast)
    is_allowed, reason = _keyword_check(query)
    if not is_allowed:
        return False, REDIRECT_MESSAGE

    # Step 2: Semantic check (lenient)
    is_relevant, distance = _relevance_check(query)
    if not is_relevant:
        return False, REDIRECT_MESSAGE

    return True, None


if __name__ == "__main__":
    # Test cases - English and Indonesian
    test_queries = [
        # Should ALLOW - English
        ("Tell me about Zhilaan", True),
        ("What projects has he built?", True),
        ("What is Videfly?", True),
        ("What tech stack does he use?", True),
        ("Tell me more about his AI work", True),
        ("Explain his edge AI experience", True),
        ("How does his pipeline work?", True),
        ("Describe his role at Videfly", True),

        # Should ALLOW - Indonesian
        ("Ceritakan tentang Zhilaan", True),
        ("Apa proyek yang sudah dibuat?", True),
        ("Jelaskan pengalamannya", True),
        ("Skill apa yang dia punya?", True),
        ("Bagaimana cara kerja pipeline-nya?", True),
        ("Ceritakan lebih dalam tentang AI-nya", True),

        # Should BLOCK - clearly off-topic
        ("Write me a Python function to sort arrays", False),
        ("What's the weather today in Jakarta?", False),
        ("Help me debug my code", False),
        ("Who is the president of Indonesia?", False),
        ("How do I get rich quick?", False),
        ("Send me an email", False),
    ]

    print("Testing guardrails...\n")
    passed = 0
    failed = 0

    for query, expected in test_queries:
        allowed, _ = check_guardrails(query)
        status = "✅" if allowed == expected else "❌"

        if allowed == expected:
            passed += 1
        else:
            failed += 1

        result = "ALLOWED" if allowed else "BLOCKED"
        expected_str = "ALLOWED" if expected else "BLOCKED"
        print(f"{status} {query}")
        print(f"   Got: {result} | Expected: {expected_str}\n")

    print(f"\nResults: {passed}/{passed + failed} passed")
