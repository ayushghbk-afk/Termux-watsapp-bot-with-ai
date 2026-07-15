# 📱 Termux WhatsApp AI Assistant with OCR & Web Search

<p align="center">

![Platform](https://img.shields.io/badge/Platform-Android-green)
![Termux](https://img.shields.io/badge/Runs%20On-Termux-blue)
![Node.js](https://img.shields.io/badge/Node.js-Required-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Active-success)

</p>

A lightweight WhatsApp AI assistant that runs **100% locally on Android using Termux**.

It combines:

- 🤖 Local AI (Ollama)
- 📷 OCR using Tesseract
- 🌐 Live Web Search
- 💬 WhatsApp Automation
- 🔄 PM2 Background Process Manager

No cloud server is required.

---

# ✨ Features

- 🤖 Offline AI replies
- 📷 OCR image text extraction
- 🌍 Live web search support
- 🔒 User whitelist security
- 👥 Group chat support
- 🔄 Auto restart using PM2
- 📱 Runs entirely inside Termux
- ⚡ Optimized for low RAM devices
- 🧠 Supports multiple Ollama AI models

---

# 📂 Project Structure

```text
Termux-watsapp-bot-with-ai/

├── index.js
├── package.json
├── package-lock.json
├── auth_info/
├── utils/
├── README.md
└── ...
```

---

# 📋 Requirements

- Android 10+
- Latest Termux (F-Droid)
- Node.js
- Git
- Ollama
- Tesseract OCR
- PM2

---

# 🚀 Installation

## 1. Update packages

```bash
pkg update -y
pkg upgrade -y
```

---

## 2. Install dependencies

```bash
pkg install nodejs git tesseract android-tools ollama -y
```

---

## 3. Install PM2

```bash
npm install -g pm2
```

---

## 4. Clone repository

```bash
git clone https://github.com/ayushghbk-afk/Termux-watsapp-bot-with-ai.git

cd Termux-watsapp-bot-with-ai
```

---

## 5. Install npm packages

```bash
npm install
```

---

# 🤖 Install & Start Ollama

Start the Ollama server:

```bash
ollama serve &
```

Download the default model:

```bash
ollama pull qwen2.5:0.5b
```

---

# ⚙ Configuration

Open:

```bash
nano index.js
```

Edit the configuration:

```javascript
const CONFIG = {

ALLOWED_USERS: [
"919529091811@s.whatsapp.net",
"190275657924634@lid"
],

AI_NAME: "v1 of ayush",

ORGANIZATION_NAME: "ayush development labs",

ENGINE_NAME: "v1 engine",

OLLAMA_MODEL: "qwen2.5:0.5b",

OLLAMA_HOST: "http://127.0.0.1:11434",

TESSERACT_BINARY:
"/data/data/com.termux/files/usr/bin/tesseract"

};
```

Save:

```
CTRL + O
ENTER
CTRL + X
```

---

# 🧠 Using a Different AI Model

This project works with **any Ollama model**.

## View installed models

```bash
ollama list
```

Example:

```text
NAME                SIZE
qwen2.5:0.5b        397 MB
qwen2.5:1.5b        934 MB
gemma3:1b           815 MB
llama3.2:3b         2.0 GB
phi3:mini           2.3 GB
```

---

## Download a new model

```bash
ollama pull <model-name>
```

Examples:

```bash
ollama pull qwen2.5:0.5b
```

```bash
ollama pull qwen2.5:1.5b
```

```bash
ollama pull gemma3:1b
```

```bash
ollama pull llama3.2:3b
```

```bash
ollama pull phi3:mini
```

```bash
ollama pull mistral:7b
```

---

## Change the model

Open:

```bash
nano index.js
```

Find:

```javascript
OLLAMA_MODEL: "qwen2.5:0.5b",
```

Replace it with any installed model.

Example:

```javascript
OLLAMA_MODEL: "gemma3:1b",
```

or

```javascript
OLLAMA_MODEL: "llama3.2:3b",
```

Save the file:

```
CTRL + O
ENTER
CTRL + X
```

Restart the bot:

```bash
npm run restart
```

---

## Recommended Models

| Model | RAM | Speed | Quality |
|-------|----:|:-----:|:-------:|
| qwen2.5:0.5b | 1 GB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| qwen2.5:1.5b | 2 GB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| gemma3:1b | 2 GB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| llama3.2:3b | 4–6 GB | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| phi3:mini | 4–6 GB | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| mistral:7b | 8+ GB | ⭐⭐ | ⭐⭐⭐⭐⭐ |

### Tips

- 📱 **Low-end devices (4–6 GB RAM):** `qwen2.5:0.5b` or `gemma3:1b`
- ⚖️ **Balanced performance:** `qwen2.5:1.5b`
- 🧠 **Best quality:** `llama3.2:3b` or `phi3:mini`
- 💻 **High-end devices (8 GB+ RAM):** `mistral:7b`

> **Note:** Larger models require more RAM, storage, and CPU power. If a model is too large for your device, Ollama may run slowly or fail to load.

---

# ▶ First Launch

Start the bot:

```bash
npm start
```

Scan the QR code using:

```text
WhatsApp

↓

Settings

↓

Linked Devices

↓

Link a Device
```

After successful login:

```text
CTRL + C
```

---

# 🔄 Run in Background

Start:

```bash
npm run start:bg
```

View logs:

```bash
npm run logs
```

Restart:

```bash
npm run restart
```

Stop:

```bash
npm run stop
```

---

# 📷 OCR Example

Send an image with a caption such as:

```text
Explain this image
```

or

```text
Translate this text
```

The bot will:

- Extract text using Tesseract
- Send it to Ollama
- Return an AI-generated response

---

# 🌐 Web Search

Prefix your message with:

```text
!search
```

Example:

```text
!search Latest SpaceX launch
```

The bot will:

- Search the web
- Collect live information
- Send results to Ollama
- Generate an updated answer

---

# 🔒 Authorized Users

Only users listed in:

```javascript
ALLOWED_USERS
```

can interact with the AI.

Unauthorized users are ignored automatically.

---

# 📦 Commands

| Command | Description |
|----------|-------------|
| `npm start` | Start the bot |
| `npm run start:bg` | Run in background |
| `npm run logs` | View PM2 logs |
| `npm run restart` | Restart bot |
| `npm run stop` | Stop bot |

---

# ❓ Troubleshooting

## ECONNREFUSED

Make sure Ollama is running:

```bash
ollama serve &
```

---

## Unauthorized User

Add the user's WhatsApp JID to:

```javascript
ALLOWED_USERS
```

Then restart:

```bash
npm run restart
```

---

## Termux Stops Running

- Disable Battery Optimization
- Enable Wake Lock
- Disable Phantom Process Killer (if applicable)

---

# 🛠 Built With

- Node.js
- Baileys
- Ollama
- Tesseract OCR
- PM2
- DuckDuckGo Search
- Termux

---

# 📜 License

Licensed under the **MIT License**.

Feel free to fork, modify, and improve this project.

---

# ⭐ Support

If you found this project useful, consider giving it a **⭐ Star** on GitHub.

It helps others discover the project and motivates future development.

---

<p align="center">
Made with ❤️ for the Android & Termux Community
</p>
