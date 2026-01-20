/* =========================
   Petneeds.ai AI Chat Script
   FINAL – LOCKED
   ========================= */

let voiceEnabled = true;

/* Ask AI (text or voice) */
async function askAI(textOverride) {
  const inputEl = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  const message = textOverride || inputEl.value.trim();
  if (!message) return;

  chatLog.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
  inputEl.value = "";

  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    const reply = data.reply || "No response.";

    chatLog.innerHTML += `<div><strong>Petneeds.ai:</strong> ${reply}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;

    if (voiceEnabled && "speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(reply);
      utter.lang = "en-US";
      speechSynthesis.speak(utter);
    }

  } catch (err) {
    chatLog.innerHTML += `<div><em>AI temporarily unavailable.</em></div>`;
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

/* 🔊 Toggle voice output */
function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  alert(`Voice output ${voiceEnabled ? "enabled" : "disabled"}`);
}
