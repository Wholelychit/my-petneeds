/* =========================
   Petneeds.ai AI Chat Script
   ========================= */

let voiceEnabled = true;

/* Voice input */
function startVoice() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice input not supported in this browser.");
    return;
  }
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    askAI(transcript);
  };
  recognition.start();
}

/* Voice output */
function speak(text) {
  if (!voiceEnabled) return;
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1;
  msg.pitch = 1;
  msg.lang = "en-US";
  speechSynthesis.speak(msg);
}

/* Toggle voice */
function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  const btn = document.getElementById("voice-toggle");
  if (btn) btn.textContent = voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off";
  if (!voiceEnabled) speechSynthesis.cancel();
}

/* Ask AI */
async function askAI(textFromVoice = null) {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");
  if (!chatLog || !input) return;

  const question = textFromVoice || input.value.trim();
  if (!question) return;

  chatLog.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
  input.value = "";
  chatLog.scrollTop = chatLog.scrollHeight;

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question }),
    });
    const data = await response.json();
    const answer = data.reply || "AI did not respond.";
    chatLog.innerHTML += `<p><strong>Petneeds.ai:</strong> ${answer}</p>`;
    chatLog.scrollTop = chatLog.scrollHeight;
    speak(answer);
  } catch (err) {
    chatLog.innerHTML += `<p><em>AI service unavailable.</em></p>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  }
}

/* =========================
   Cloudflare Worker backend
   ========================= */
import OpenAI from "openai";

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    const message = body.message?.trim();

    if (!message) {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: `
You are Petneeds.ai, a responsible pet care assistant.
Provide safe, educational, non-medical guidance.
Always include a gentle disclaimer.
Do NOT diagnose or give medical treatment.

User question: ${message}`,
    });

    return new Response(
      JSON.stringify({ reply: response.output_text || "No response" }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}

