"""
HF Space entry point — runs the FastAPI server in a background thread.
HF Spaces expects app.py at the root. This wrapper starts uvicorn
so the API (POST /api/chat) is available at the Space URL.
"""

import os
import threading
import uvicorn

# Set defaults for HF Space environment
os.environ.setdefault("ALLOWED_ORIGINS", "*")

def run_server():
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=7860,
        log_level="info",
    )

if __name__ == "__main__":
    thread = threading.Thread(target=run_server, daemon=True)
    thread.start()
    thread.join()
