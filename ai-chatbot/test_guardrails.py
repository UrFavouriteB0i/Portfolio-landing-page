#!/usr/bin/env python3
"""
Quick test script for guardrails and RAG pipeline.
Run: python test_guardrails.py
"""

import sys
sys.path.insert(0, ".")

from rag.knowledge import retrieve, get_portfolio_summary
from guardrails.filters import check_guardrails


def test_guardrails():
    """Test guardrails with various queries."""
    print("=" * 60)
    print("GUARDRAILS TEST")
    print("=" * 60)

    test_queries = [
        # Should ALLOW
        ("Tell me about Zhilaan", True),
        ("What projects has he built?", True),
        ("What is Videfly?", True),
        ("What tech stack does he use?", True),
        ("Tell me about his edge AI work", True),
        ("What's his experience at Festo?", True),

        # Should BLOCK
        ("How do I install Python?", False),
        ("What's the weather today?", False),
        ("Write me a Python function", False),
        ("Who is the president of Indonesia?", False),
        ("Can you help me with my homework?", False),
        ("What is machine learning?", False),
    ]

    print("\nTest Results:\n")
    passed = 0
    failed = 0

    for query, expected_allow in test_queries:
        is_allowed, redirect_msg = check_guardrails(query)
        status = "✅" if is_allowed == expected_allow else "❌"

        if is_allowed == expected_allow:
            passed += 1
        else:
            failed += 1

        allowed_str = "ALLOWED" if is_allowed else "BLOCKED"
        expected_str = "ALLOWED" if expected_allow else "BLOCKED"

        print(f"{status} {query}")
        print(f"   Got: {allowed_str} | Expected: {expected_str}")
        if not is_allowed and redirect_msg:
            print(f"   Redirect: {redirect_msg[:60]}...")
        print()

    print(f"\nResults: {passed}/{passed + failed} passed")
    return failed == 0


def test_rag():
    """Test RAG retrieval."""
    print("\n" + "=" * 60)
    print("RAG RETRIEVAL TEST")
    print("=" * 60)

    test_queries = [
        "What projects has Zhilaan built?",
        "What is his experience?",
        "Tell me about Videfly",
        "What tech stack does he use?",
    ]

    for query in test_queries:
        print(f"\nQuery: {query}")
        results = retrieve(query, n_results=3)
        print(f"Retrieved {len(results)} chunks:")
        for i, doc in enumerate(results):
            print(f"  {i+1}. {doc[:100]}...")

    print("\n✅ RAG retrieval working!")


def test_summary():
    """Test portfolio summary generation."""
    print("\n" + "=" * 60)
    print("PORTFOLIO SUMMARY TEST")
    print("=" * 60)

    summary = get_portfolio_summary()
    print(summary)
    print("\n✅ Summary generation working!")


if __name__ == "__main__":
    print("Testing AI Sidekick components...\n")

    try:
        guardrails_ok = test_guardrails()
        test_rag()
        test_summary()

        if guardrails_ok:
            print("\n" + "=" * 60)
            print("✅ ALL TESTS PASSED!")
            print("=" * 60)
            print("\nReady to deploy! Run: streamlit run app.py")
        else:
            print("\n" + "=" * 60)
            print("❌ SOME TESTS FAILED")
            print("=" * 60)
            sys.exit(1)

    except Exception as e:
        print(f"\n❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
