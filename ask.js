async function askAI(textFromVoice = null) {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  const question = textFromVoice || input.value.trim();
  if (!question) return;

  chatLog.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
  input.value = "";

  const response = await fetch(`/api/ask?q=${encodeURIComponent(question)}`);
  const data = await response.json();

  chatLog.innerHTML += `<p><strong>Petneeds.ai:</strong> ${data.answer}</p>`;

  speak(data.answer);
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

/* 🔊 Voice output */
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1;
  msg.pitch = 1;
  msg.lang = "en-US";
  speechSynthesis.speak(msg);
}


