/* =========================
   Petneeds.ai AI Chat Script
========================= */

let voiceEnabled = true;

async function askAI(message) {
  const inputEl = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  const question = message || inputEl.value.trim();
  if (!question) return;

  chatLog.innerHTML += `<div><strong>You:</strong> ${question}</div>`;
  inputEl.value = "";

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question })
    });
    const data = await res.json();
    chatLog.innerHTML += `<div><strong>Petneeds.ai:</strong> ${data.reply}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  } catch {
    chatLog.innerHTML += `<div><strong>Petneeds.ai:</strong> Sorry, AI service unavailable.</div>`;
  }
}

/* 🎤 Voice input */
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

function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  const btn = document.getElementById("voice-toggle");
  if (btn) btn.textContent = voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off";
}
