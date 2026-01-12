async function askAI() {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  if (!input.value.trim()) return;

  const question = input.value;

  chatLog.innerHTML += `<p><strong>You:</strong> ${question}</p>`;
  input.value = "";

  try {
    const response = await fetch(
      `/api/ask?q=${encodeURIComponent(question)}`
    );

    const data = await response.json();

    chatLog.innerHTML += `<p><strong>Petneeds.ai:</strong> ${data.answer}</p>`;
  } catch (err) {
    chatLog.innerHTML += `<p><strong>Petneeds.ai:</strong> Sorry, something went wrong.</p>`;
  }
}

