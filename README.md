# 📱 Termux-watsapp-bot-with-ai

A localized, hardware-optimized WhatsApp bot designed to run directly on Android systems using **Termux**, **Ollama (Qwen2.5:0.5b)**, and **Tesseract OCR**. Features secure whitelisting, live web search capabilities, image text analysis, and model identity protection.

---

## ✨ Features
* 🧠 **100% Offline AI Processing** – Runs a hardware-tuned $0.5\text{B}$ parameter model entirely on mobile CPUs.
* 📷 **Image OCR Extraction** – Analyzes screenshots, documents, and visual text structures.
* 🌐 **Dynamic Web Search** – Bypasses typical model knowledge cutoffs via a fast fallback search parser.
* 🔒 **Whitelist Gatekeeping** – Only responds to explicitly specified phone numbers, groups, or LIDs.
* 🎭 **Identity Masking** – Automatically filters real-name mentions to present a unified custom persona.
* 🔄 **24/7 Background Runtime** – Native integration with **PM2** ensures automatic recovery from process dumps or OS reboots.

---

## 🚀 Installation & Setup

### 1. Set Up the Termux Environment
Execute these setup commands in your Termux application window:
```bash
# Update repositories and install core binaries
pkg update -y
pkg install nodejs tesseract git android-tools -y

# Install PM2 globally to handle background tasks
npm install -g pm2

# Clone this repository
git clone [https://github.com/ayushghbk-afk/Termux-watsapp-bot-with-ai.git](https://github.com/ayushghbk-afk/Termux-watsapp-bot-with-ai.git)
cd Termux-watsapp-bot-with-ai

# Install dependencies
npm install
