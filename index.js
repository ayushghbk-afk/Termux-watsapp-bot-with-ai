const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const qrcode = require('qrcode-terminal');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const tesseract = require("node-tesseract-ocr");
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const logger = pino({ level: 'silent' });

// ==========================================
// ⚙️ USER CONFIGURATION BLOCK
// Change these settings to customize your bot
// ==========================================
const CONFIG = {
    // 🔒 Access Control Whitelist Configuration
    // Add numbers (with country code + @s.whatsapp.net) or group IDs (@g.us) or LIDs (@lid)
    ALLOWED_USERS: [
        "919529091811@s.whatsapp.net", // Example format
    ],
    
    // 🤖 Identity Mapping Profile
    AI_NAME: "v1 of ayush",
    ORGANIZATION_NAME: "ayush development labs",
    ENGINE_NAME: "v1 engine",

    // 🧠 Ollama Local LLM Configuration
    OLLAMA_MODEL: 'qwen2.5:0.5b',
    OLLAMA_HOST: 'http://127.0.0.1:11434',
    
    // 🛠️ OCR Engine Binary Path (Customized for Android Termux)
    TESSERACT_BINARY: "/data/data/com.termux/files/usr/bin/tesseract"
};

// Tesseract OCR Configuration
const tesseractConfig = {
    lang: "eng",
    oem: 1,
    psm: 3,
    binary: CONFIG.TESSERACT_BINARY
};

// Helper evaluating if the incoming sender JID is authorized
function isUserAllowed(jid) {
    return CONFIG.ALLOWED_USERS.includes(jid);
}

// 🌐 Advanced JSON + HTML Fallback Web Search Engine
async function searchTheWeb(query) {
    try {
        console.log(`[Web Search]: Extracting structural data for: "${query}"`);
        const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
        
        const response = await fetch(searchUrl, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' 
            }
        });
        
        let results = [];

        if (response.ok) {
            const data = await response.json();
            if (data.AbstractText) results.push(data.AbstractText);
            if (data.RelatedTopics && Array.isArray(data.RelatedTopics)) {
                for (const topic of data.RelatedTopics) {
                    if (results.length >= 3) break;
                    if (topic.Text && !results.includes(topic.Text)) results.push(topic.Text);
                }
            }
        }

        if (results.length === 0) {
            console.log("[Web Search]: JSON feed blank. Running fallback parser...");
            const htmlResponse = await fetch(`https://html.duckduckgo.com/html/`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Mozilla/5.0'
                },
                body: `q=${encodeURIComponent(query)}`
            });
            
            if (htmlResponse.ok) {
                const html = await htmlResponse.text();
                const $ = cheerio.load(html);
                $('.result__snippet').slice(0, 3).each((i, el) => {
                    const txt = $(el).text().trim();
                    if (txt) results.push(txt);
                });
            }
        }

        return results.length > 0 ? results.slice(0, 3).join("\n\n") : null;
    } catch (err) {
        console.error("[Search Error]:", err.message);
        return null;
    }
}

function needsInternet(text) {
    return text.toLowerCase().startsWith('!search ');
}

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_session');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true, 
        logger,
        browser: ["Termux Auto-Bot", "Safari", "1.0.0"],
        syncFullHistory: false 
    });

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        if (qr) {
            console.clear();
            qrcode.generate(qr, { small: true });
        }
        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof Boom) ? 
                lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut : true;
            if (shouldReconnect) startBot();
        } else if (connection === 'open') {
            console.clear();
            console.log('=====================================================');
            console.log('✅ SUCCESS: WhatsApp Automation Active!');
            console.log(`🤖 Identity Mask Active: Mapped to "${CONFIG.AI_NAME}"`);
            console.log('=====================================================');
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe || msg.key.remoteJid === 'status@broadcast') return;

        const from = msg.key.remoteJid;

        if (!isUserAllowed(from)) {
            console.log(`[Access Denied]: Ignored unauthorized message from: ${from}`);
            return;
        }

        let promptText = "";
        let originalUserText = "";
        let isImage = false;

        const imageMessage = msg.message.imageMessage || 
                             msg.message.viewOnceMessage?.message?.imageMessage || 
                             msg.message.viewOnceMessageV2?.message?.imageMessage ||
                             msg.message.documentWithCaptionMessage?.message?.documentMessage;

        if (imageMessage) {
            isImage = true;
            console.log("[Media Pipeline]: Received image. Downloading stream...");
            await sock.sendPresenceUpdate('composing', from);
            
            const tempPath = path.join(__dirname, `temp_${Date.now()}.jpg`);
            
            try {
                const stream = await downloadContentFromMessage(imageMessage, 'image');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) { 
                    buffer = Buffer.concat([buffer, chunk]); 
                }

                if (buffer.length === 0) throw new Error("Blank media buffer.");

                fs.writeFileSync(tempPath, buffer);
                const extractedText = await tesseract.recognize(tempPath, tesseractConfig);
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);

                const cleanExtractedText = extractedText.trim();
                const caption = imageMessage.caption || "";

                if (cleanExtractedText) {
                    originalUserText = caption ? `${caption} (Image text: ${cleanExtractedText})` : cleanExtractedText;
                    
                    promptText = `You are reading a snapshot image sent by the user. Here is the text found written inside the image: "${cleanExtractedText}".`;
                    if (caption) {
                        promptText += `\n\nThe user also included this instruction with the image: "${caption}".`;
                    }
                    promptText += `\n\nExplain or answer based on the text found in the image. Keep it brief.`;
                } else if (caption) {
                    originalUserText = caption;
                    promptText = caption;
                } else {
                    await sock.sendMessage(from, { text: "❌ I couldn't find any clear text to read inside that image." });
                    await sock.sendPresenceUpdate('paused', from);
                    return;
                }
            } catch (ocrError) {
                console.error("[OCR Engine Error]:", ocrError.message);
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
                await sock.sendMessage(from, { text: "⚠️ System architecture failed to execute image extraction layer." });
                await sock.sendPresenceUpdate('paused', from);
                return;
            }
        } else {
            promptText = msg.message.conversation || msg.message.extendedTextMessage?.text || "";
            originalUserText = promptText;
            if (!promptText) return;
        }

        if (needsInternet(originalUserText)) {
            await sock.sendPresenceUpdate('composing', from);
            const cleanQuery = originalUserText.slice(8).trim(); 
            const webData = await searchTheWeb(cleanQuery);
            
            if (webData) {
                promptText = `[Current Context Date/Time: Wednesday, July 15, 2026]\n[Live Web Results]:\n${webData}\n\n[User Query]:\n${cleanQuery}\n\nInstructions: Answer the user query using the live web facts directly above. Keep it brief.`;
            }
        }

        try {
            if (!isImage) await sock.sendPresenceUpdate('composing', from);

            console.log("[Ollama]: Requesting local inference stream...");
            const response = await fetch(`${CONFIG.OLLAMA_HOST}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: CONFIG.OLLAMA_MODEL, 
                    prompt: promptText,
                    stream: false,
                    options: {
                        num_predict: 120,   
                        temperature: 0.2,   
                        top_k: 20
                    }
                })
            });

            if (!response.ok) throw new Error(`Ollama dynamic error: ${response.status}`);

            const data = await response.json();
            let aiReply = data.response.trim();

            // 🎭 Post-Processing Identity Filters (Driven by Config block)
            const qwenRegEx = new RegExp("qwen", "gi");
            const alibabaRegEx = new RegExp("alibaba", "gi");
            const tongyiRegEx = new RegExp("tongyi", "gi");

            aiReply = aiReply
                .replace(qwenRegEx, CONFIG.AI_NAME)
                .replace(alibabaRegEx, CONFIG.ORGANIZATION_NAME)
                .replace(tongyiRegEx, CONFIG.ENGINE_NAME);

            await sock.sendMessage(from, { 
                text: `${aiReply}\n\n⚡ _Termux Web-Smart Engine_` 
            });
            
            await sock.sendPresenceUpdate('paused', from);

        } catch (error) {
            console.error("[Pipeline Error]:", error.message);
            let errorMsg = "⚠️ Micro LLM pipeline failed to generate text.";
            if (error.code === 'ECONNREFUSED') {
                errorMsg = "⚠️ Local Ollama server is offline!";
            }
            await sock.sendMessage(from, { text: errorMsg });
            await sock.sendPresenceUpdate('paused', from);
        }
    });
}

startBot();
