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

  recognition.onerror = (event) => {
    console.error("Voice recognition error:", event.error);
  };

  recognition.start();
}

/* 🔊 Toggle voice feedback */
function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  const btn = document.getElementById("voice-toggle");
  btn.textContent = voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off";
}

/* 💬 Send question to Worker */
async function askAI(question = null) {
  const inputEl = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  // Use parameter or input box
  const userMessage = question || inputEl.value.trim();
  if (!userMessage) return;

  // Show user message
  chatLog.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
  chatLog.scrollTop = chatLog.scrollHeight;

  inputEl.value = ""; // Clear input

  try {
    const res = await fetch("https://my-petneeds.wholelychit.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();
    const aiReply = data.reply || "Sorry, no response from AI.";

    // Show AI reply
    chatLog.innerHTML += `<div><strong>Petneeds.ai:</strong> ${aiReply}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;

    // Optional: voice output
    if (voiceEnabled && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(aiReply);
      speechSynthesis.speak(utterance);
    }

  } catch (err) {
    console.error("Error fetching AI response:", err);
    chatLog.innerHTML += `<div><strong>Petneeds.ai:</strong> Sorry, AI service is unavailable.</div>`;
  }
}
