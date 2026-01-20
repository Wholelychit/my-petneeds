/* =========================
   Petneeds.ai AI Chat Script
   ========================= */

let voiceEnabled = true;
let recognition;

/* 🎤 Voice input */
function startVoice() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice input not supported in this browser.");
    return;
  }

  recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("user-input").value = transcript;
    askAI(transcript);
  };

  recognition.onerror = (event) => {
    console.error("Voice recognition error:", event.error);
  };

  recognition.start();
}

/* Toggle voice button label */
function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  const btn = document.getElementById("voice-toggle");
  btn.textContent = voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off";
}

/* 📝 Ask AI */
async function askAI(messageInput) {
  const inputField = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");
  const message = messageInput || inputField.value.trim();

  if (!message) return;

  // Append user message
  const userMsg = document.createElement("div");
  userMsg.textContent = `You: ${message}`;
  userMsg.style.fontWeight = "bold";
  chatLog.appendChild(userMsg);
  chatLog.scrollTop = chatLog.scrollHeight;

  inputField.value = "";

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    const replyMsg = document.createElement("div");
    replyMsg.textContent = `Petneeds.ai: ${data.reply}`;
    chatLog.appendChild(replyMsg);
    chatLog.scrollTop = chatLog.scrollHeight;

    // Optional: speak reply
    if (voiceEnabled && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(data.reply);
      window.speechSynthesis.speak(utterance);
    }
  } catch (err) {
    console.error(err);
    const errorMsg = document.createElement("div");
    errorMsg.textContent = "Petneeds.ai: Sorry, AI service is unavailable.";
    chatLog.appendChild(errorMsg);
  }
}

/* Optional: allow pressing Enter to submit */
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("user-input");
  if (inputField) {
    inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        askAI();
        e.preventDefault();
      }
    });
  }
});

   
