
export async function onRequestPost({ request, env }) {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
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
      JSON.stringify({
        answer: data.output_text || "No response available."
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
let voiceEnabled = true;

async function askAI(textFromVoice = null) {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  const question = textFromVoice || input.value.trim();
  if (!question) return;

  chatLog.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
  input.value = "";

  const response = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question })
  });

  const data = await response.json();

  chatLog.innerHTML += `<p><strong>Petneeds.ai:</strong> ${data.answer}</p>`;

  const shortAnswer = data.answer.slice(0, 600);
  speak(shortAnswer);
}

function speak(text) {
  if (!voiceEnabled) return;
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  speechSynthesis.speak(msg);
}
