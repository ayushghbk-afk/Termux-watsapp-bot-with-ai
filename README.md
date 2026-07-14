# 📱 Termux WhatsApp AI Assistant with OCR & Web Search

An open-source, highly-optimized, localized WhatsApp automation bot designed to run 100% locally on Android devices. Powered by **Termux**, **Ollama (Qwen2.5:0.5b)**, and **Tesseract OCR**, this bot features robust gatekeeping, image text extraction, live web querying, and background stability via **PM2**.

---

## 📖 Table of Contents
1. [Prerequisites & Phone Prep](#1-prerequisites--phone-prep)
2. [Step-by-Step Installation](#2-step-by-step-installation)
3. [Configuration & Customization](#3-configuration--customization)
4. [First-Time Launch & Authentication](#4-first-time-launch--authentication)
5. [Running 24/7 in the Background (PM2)](#5-running-247-in-the-background-pm2)
6. [How to Use & Test the Bot](#6-how-to-use--test-the-bot)
7. [Troubleshooting & FAQs](#7-troubleshooting--faqs)

---

## 1. Prerequisites & Phone Prep

Before typing a single command, you need to set up your Android environment so it doesn't kill the bot when you turn off your screen.

### A. Download the Correct Termux App
> ⚠️ **Do not download Termux from the Google Play Store!** The Play Store version is severely outdated and will break.
* Download the latest version of Termux from [F-Droid](https://f-droid.org/en/packages/com.termux/) or directly from the [Termux GitHub Releases Page](https://github.com/termux/termux-app/releases).

### B. Stop Android from Killing Background Tasks
Android's battery savers aggressively shut down background Terminal scripts. Apply these three fixes:
1. **Disable Battery Optimization:** Go to your phone's **Settings** > **Apps** > **Termux** > **Battery** and select **Unrestricted**.
2. **Acquire Termux Wake Lock:** Open Termux, pull down your notification tray, and tap **"Acquire Wake Lock"** on the Termux persistent notification.
3. **Disable Phantom Process Killer (Android 12+):** 
   * Go to **Settings** > **Developer Options**.
   * Toggle **Disable Child Process Restrictions** to **ON**.
   * Toggle **Suspend execution for cached apps** to **OFF**.
   * Reboot your phone.

---

## 2. Step-by-Step Installation

Launch your freshly installed Termux app and execute the following sequences:

### Step A: Update Environment & Package Lists
Ensure your package lists are up to date and upgrade pre-installed systems:
```bash
pkg update -y && pkg upgrade -y
Step B: Install Core Binaries
​Install Git, Node.js, Tesseract OCR, and basic Android command tools:pkg install nodejs tesseract git android-tools -y
Step C: Install PM2 Globally
​PM2 will manage our background scripts and restart them instantly if the process crashes:npm install -g pm2
Step D: Clone the Repository & Install Dependencies
​Now clone your customized workspace and build the project environment:git clone [https://github.com/ayushghbk-afk/Termux-watsapp-bot-with-ai.git](https://github.com/ayushghbk-afk/Termux-watsapp-bot-with-ai.git)
cd Termux-watsapp-bot-with-ai
npm install
Step E: Download the Local AI Model
​In order for the AI to answer offline, we need to spin up the local model server.Open a new Termux session (swipe from the left edge of your screen and tap "New Session").Install Ollama and start its service:pkg install ollama
ollama serve &
Pull the highly efficient, lightweight model designed for mobile memory limits:ollama pull qwen2.5:0.5b
(You can now close this tab. The server runs safely in the background).3. Configuration & Customization
​Before launching, you must authorize your phone numbers and configure your custom identity.Open index.js in a terminal text editor:nano index.js
Locate the CONFIG block at the very top of the script:const CONFIG = {
    // Add JIDs that have permission to use the bot:
    ALLOWED_USERS: [
        "919529091811@s.whatsapp.net", // Whitelist your personal WhatsApp Number (Include country code)
        "1203632057924634@g.us"        // Group chats or JID/LIDs are also supported
    ],

    // Customize your AI Persona's identity mapping
    AI_NAME: "v1 of ayush",
    ORGANIZATION_NAME: "ayush development labs",
    ENGINE_NAME: "v1 engine",

    OLLAMA_MODEL: 'qwen2.5:0.5b',
    OLLAMA_HOST: '[http://127.0.0.1:11434](http://127.0.0.1:11434)',
    TESSERACT_BINARY: "/data/data/com.termux/files/usr/bin/tesseract"
};
Edit the arrays and names to match your preference.Press CTRL + O then Enter to save, and CTRL + X to exit.First-Time Launch & Authentication
​To pair the bot to your WhatsApp account:Launch the script directly in your terminal foreground:npm start
A large QR Code will generate directly inside the Termux terminal window.
