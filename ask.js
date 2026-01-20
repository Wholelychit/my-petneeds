/* =========================
   Petneeds.ai AI Chat Script
   ========================= */

let voiceEnabled = true;

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
    document.getElementById("user-input").value = transcript;
    askAI(transcript);
  };

  recognition.start();
}

/* 🔊 Toggle voice reading of AI responses */
function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  document.getElementById("voice-toggle").innerText = voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off";
}

/* 💬 Send question to Worker API */
async function askAI(message) {
  const inputEl = document.getElementById("user-input");
  if (!message) message = inputEl.value.trim();
  if (!message) return;

  const logEl = document.getElementById("chat-log");
  logEl.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
  inputEl.value = "";

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await res.json();
    const reply = data.reply || "Sorry, no response.";

    logEl.innerHTML += `<div><strong>Petneeds.ai:</strong> ${reply}</div>`;
    logEl.scrollTop = logEl.scrollHeight;

    if (voiceEnabled && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(reply);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  } catch (err) {
    console.error(err);
    logEl.innerHTML += `<div><strong>Petneeds.ai:</strong> AI service unavailable.</div>`;
  }
}

