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
    askAI(transcript);
  };

  recognition.start();
}

/* 🔊 Voice output */
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

/* 📝 Ask AI function */
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
      body: JSON.stringify({ message: question })
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


export async function onRequestPost({ request, env }) {
  
  try {
    const body = await request.json();
    const message = body.message;

    if (!message) {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        input: `You are Petneeds.ai, a responsible pet-care assistant.
Give clear, safe, non-medical guidance only.

User question: ${message}`
      })
    });

    const data = await aiResponse.json();

    return new Response(
      JSON.stringify({ reply: data.output_text || "No response" }),
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

