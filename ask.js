/* =========================
   Global Voice State
   ========================= */
let voiceEnabled = true;

/* =========================
   Ask AI (Text or Voice)
   ========================= */
async function askAI(textFromVoice = null) {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  const question = textFromVoice || input.value.trim();
  if (!question) return;

  chatLog.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
  input.value = "";

  try {
    const response = await fetch(`/api/ask?q=${encodeURIComponent(question)}`);
    const data = await response.json();

    chatLog.innerHTML += `<p><strong>Petneeds.ai:</strong> ${data.answer}</p>`;
    speak(data.answer);
  } catch (err) {
    chatLog.innerHTML += `<p><strong>Error:</strong> AI unavailable.</p>`;
  }
}

/* =========================
   🎤 Voice Input
   ========================= */
function startVoice() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice input not supported in this browser.");
    return;
  }

  const listening = document.getElementById("listening");
  listening.classList.remove("hidden");

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    listening.classList.add("hidden");
    const transcript = event.results[0][0].transcript;
    askAI(transcript);
  };

  recognition.onerror = () => {
    listening.classList.add("hidden");
  };

  recognition.onend = () => {
    listening.classList.add("hidden");
  };

  recognition.start();
}

/* =========================
   🔊 Voice Output
   ========================= */
function speak(text) {
  if (!voiceEnabled || !("speechSynthesis" in window)) return;

  speechSynthesis.cancel(); // stop overlap

  const msg = new SpeechSynthesisUtterance(text);
  }
  // Calm, friendly delivery
  msg.rate = 0.95;     // slightly slower = reassuring
  msg.pitch = 1.0;     // natural tone
  msg.volume = 1.0;
  msg.lang = "en-US";

  // Try to pick a natural voice if available
  const voices = speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.name.includes("Google") ||
    v.name.includes("Natural") ||
    v.name.includes("Samantha")
  );

  if (preferred) {
    msg.voice = preferred;
  }

  speechSynthesis.speak(msg);
}


/* =========================
   🔇 Voice Toggle
   ========================= */
function toggleVoice() {
  voiceEnabled = !voiceEnabled;

  const btn = document.getElementById("voice-toggle");
  if (btn) {
    btn.textContent = voiceEnabled ? "🔊 Voice On" : "🔇 Voice Off";
  }

  if (!voiceEnabled) {
    speechSynthesis.cancel();
  }
}
 
