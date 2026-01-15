let voiceEnabled = true;

/* Ask AI */
async function askAI(textFromVoice = null) {
  const input = document.getElementById("user-input");
  const chat = document.getElementById("chat-log");

  if (!chat || !input) return;

  const question = textFromVoice || input.value.trim();
  if (!question) return;

  chat.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
  input.value = "";

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question })
    });

    const data = await response.json();
    chat.innerHTML += `<p><strong>Petneeds.ai:</strong> ${data.reply}</p>`;
    chat.scrollTop = chat.scrollHeight;

    if (voiceEnabled) speak(data.reply);

  } catch {
    chat.innerHTML += `<p><em>AI service unavailable.</em></p>`;
  }
}

/* 🎤 Voice Input */
function startVoice() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice input not supported.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onresult = (e) => {
    askAI(e.results[0][0].transcript);
  };

  recognition.start();
}

/* 🔊 Voice Output */
function speak(text) {
  speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  speechSynthesis.speak(msg);
}

/* 🔇 Toggle Voice */
function toggleVoice() {
  voiceEnabled = !voiceEnabled;
  const btn = document.getElementById("voice-toggle");
  if (btn) btn.textContent = voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off";
  if (!voiceEnabled) speechSynthesis.cancel();
}
