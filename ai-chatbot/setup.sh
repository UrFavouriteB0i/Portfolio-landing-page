#!/bin/bash
# Quick setup script for AI Sidekick

echo "🤖 Setting up Zhilaan's AI Sidekick..."
echo ""

# Check Python version
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "✓ Python version: $python_version"

# Create virtual environment
echo ""
echo "📦 Creating virtual environment..."
python3 -m venv venv
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt -q

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Get free API key from: https://console.groq.com"
echo "2. Set environment variable:"
echo "   export GROQ_API_KEY='your_api_key'"
echo ""
echo "3. Run the app:"
echo "   streamlit run app.py"
echo ""
echo "Or test guardrails:"
echo "   python test_guardrails.py"
