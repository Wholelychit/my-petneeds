async function askAI() {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  if (!input.value.trim()) return;

  chatLog.innerHTML += `<p><strong>You:</strong> ${input.value}</p>`;
  const userQuestion = input.value;

  // Call your backend API
  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userQuestion })
    });

    const data = await response.json();
    chatLog.innerHTML += `<p><strong>Petneeds.ai:</strong> ${data.answer}</p>`;
  } catch (err) {
    chatLog.innerHTML += `<p><strong>Petneeds.ai:</strong> Sorry, something went wrong.</p>`;
    console.error(err);
  }

  input.value = "";
  chatLog.scrollTop = chatLog.scrollHeight;
}

