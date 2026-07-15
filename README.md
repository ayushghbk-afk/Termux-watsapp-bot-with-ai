# 📱 Termux WhatsApp AI Assistant with OCR & Web Search

<p align="center">

![Platform](https://img.shields.io/badge/Platform-Android-green)
![Termux](https://img.shields.io/badge/Runs%20On-Termux-blue)
![Node.js](https://img.shields.io/badge/Node.js-20+-brightgreen)
![Ollama](https://img.shields.io/badge/AI-Ollama-blueviolet)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Active-success)

</p>

<p align="center">
An open-source WhatsApp AI assistant that runs <b>100% locally</b> on Android using <b>Termux</b>.<br>
Powered by <b>Ollama</b>, <b>Tesseract OCR</b>, and <b>Baileys</b>.
</p>

---

## ✨ Features

- 🤖 Offline AI replies using Ollama
- 📷 OCR image text extraction
- 🌐 Live web search support
- 💬 WhatsApp automation
- 👥 Group chat support
- 🔒 User whitelist security
- 🔄 Automatic restart with PM2
- 📱 Runs completely inside Termux
- ⚡ Optimized for low RAM devices
- 🧠 Supports multiple Ollama models

---

# 📑 Table of Contents

- Features
- Requirements
- Installation
- Install Ollama
- Configuration
- Using Different AI Models
- First Launch
- Running in Background
- OCR
- Web Search
- Commands
- Troubleshooting
- Built With
- License

---

# 📂 Project Structure

```text
Termux-whatsapp-ai/

├── auth_info/
├── utils/
├── index.js
├── package.json
├── package-lock.json
├── README.md
└── ...
```

---

# 📋 Requirements

- Android 10+
- Latest Termux (F-Droid)
- Node.js 20+
- Git
- Ollama
- Tesseract OCR
- PM2

---

# 🚀 Installation

## 1. Update packages

```bash
pkg update -y && pkg upgrade -y
```

## 2. Install dependencies

```bash
pkg install nodejs git ollama tesseract android-tools -y
```

## 3. Install PM2

```bash
npm install -g pm2
```

## 4. Clone the repository

```bash
git clone https://github.com/ayushghbk-afk/Termux-watsapp-bot-with-ai.git

cd Termux-watsapp-bot-with-ai
```

## 5. Install Node packages

```bash
npm install
```

---

# 🤖 Install Ollama

Start Ollama:

```bash
ollama serve &
```

Download the default model:

```bash
ollama pull qwen2.5:0.5b
```

---

# ⚙️ Configuration

Open:

```bash
nano index.js
```

Edit:

```javascript
const CONFIG = {

ALLOWED_USERS: [
"919529091811@s.whatsapp.net",
"190275657924634@lid"
],

AI_NAME: "v1 of ayush",

ORGANIZATION_NAME: "Ayush Development Labs",

ENGINE_NAME: "v1 Engine",

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

# 🧠 Using Different AI Models

The bot supports **any model available in Ollama**.

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
mistral:7b          4.1 GB
```

---

## Download another model

```bash
ollama pull <model-name>
```

Examples

```bash
ollama pull gemma3:1b
```

```bash
ollama pull qwen2.5:1.5b
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

## Switch AI Model

Open:

```bash
nano index.js
```

Find:

```javascript
OLLAMA_MODEL: "qwen2.5:0.5b",
```

Replace with:

```javascript
OLLAMA_MODEL: "gemma3:1b",
```

or

```javascript
OLLAMA_MODEL: "llama3.2:3b",
```

Restart:

```bash
npm run restart
```

---

## 📊 Recommended Models

| Model | RAM | Speed | Quality |
|------|------|:------:|:------:|
| qwen2.5:0.5b | 1 GB | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| qwen2.5:1.5b | 2 GB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| gemma3:1b | 2 GB | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| llama3.2:3b | 4–6 GB | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| phi3:mini | 4–6 GB | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| mistral:7b | 8+ GB | ⭐⭐ | ⭐⭐⭐⭐⭐ |

### Recommendations

| Device | Model |
|---------|-------|
| 4–6 GB RAM | qwen2.5:0.5b |
| Balanced | qwen2.5:1.5b |
| Best Quality | llama3.2:3b |
| High-end Phones | mistral:7b |

> **Note:** Larger models require more RAM, storage, and CPU power.

---

# ▶️ First Launch

```bash
npm start
```

Scan the QR Code using:

```
WhatsApp

↓

Settings

↓

Linked Devices

↓

Link a Device
```

Once connected:

```
CTRL + C
```

---

# 🔄 Running in Background

Start

```bash
npm run start:bg
```

Logs

```bash
npm run logs
```

Restart

```bash
npm run restart
```

Stop

```bash
npm run stop
```

---

# 📷 OCR

Send an image with a caption:

```
Explain this image
```

or

```
Translate this text
```

The bot will:

- Extract text using Tesseract
- Send it to Ollama
- Return an AI-generated response

---

# 🌐 Web Search

Prefix your message with:

```
!search
```

Example

```
!search Latest SpaceX launch
```

The bot will:

1. Search the web
2. Collect relevant information
3. Send results to Ollama
4. Generate a summarized response

---

# 🔒 Authorized Users

Only WhatsApp IDs listed inside

```javascript
ALLOWED_USERS
```

can use the AI.

Unauthorized users are automatically ignored.

---

# 📦 Commands

| Command | Description |
|----------|-------------|
| `npm start` | Start the bot |
| `npm run start:bg` | Run in background |
| `npm run logs` | View logs |
| `npm run restart` | Restart bot |
| `npm run stop` | Stop bot |

---

# ❓ Troubleshooting

### Ollama connection refused

```bash
ollama serve &
```

---

### Unauthorized User

Add the user's WhatsApp ID to:

```javascript
ALLOWED_USERS
```

Restart:

```bash
npm run restart
```

---

### Termux gets killed

- Disable Battery Optimization
- Enable Wake Lock
- Disable Phantom Process Killer

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

If you like this project, please give it a ⭐ on GitHub.

Your support helps improve the project and motivates future development.

---

<p align="center">
Made with ❤️ for the Android & Termux Community
</p>
