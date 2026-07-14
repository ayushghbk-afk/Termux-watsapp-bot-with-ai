# Termux-watsapp-bot-with-ai
# 📱 Termux Local WhatsApp AI Assistant

A localized, hardware-optimized WhatsApp bot designed to run directly on Android using **Termux**, **Ollama (Qwen2.5:0.5b)**, and **Tesseract OCR**. It features secure whitelisting, live web search capability, image text reading, and model identity protection.

## ✨ Features
* 🧠 **100% Offline AI Processing** – Runs a hardware-tuned $0.5\text{B}$ parameter model entirely on mobile CPUs.
* 📷 **Image OCR Extraction** – Analyzes screenshots, documents, and visual text.
* 🌐 **Dynamic Web Search** – Bypasses typical model knowledge cutoff limits via a fast fallback search parser.
* 🔒 **Whitelist Gatekeeping** – Only responds to explicitly specified phone numbers, groups, or LIDs.
* 🎭 **Identity Masking** – Automatically filters real-name mentions to present a unified custom persona.
* 🔄 **24/7 Background Runtime** – Managed by PM2 to automatically recover from system crashes or memory dumps.

---

## 🚀 Installation & Setup

### 1. Set Up Termux Environment
Run the following commands within your Termux app:
```bash
# Update repositories and install core binaries
pkg update -y
pkg install nodejs tesseract git android-tools -y

# Install PM2 globally to handle background tasks
npm install -g pm2

# Clone your project repository
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME

# Install dependencies
npm install
