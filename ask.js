function askAI() {
  const input = document.getElementById("user-input");
  const chatLog = document.getElementById("chat-log");

  if (!input.value.trim()) return;

  chatLog.innerHTML += `<p><strong>You:</strong> ${input.value}</p>`;
  chatLog.innerHTML += `<p><strong>Petneeds.ai:</strong> AI connection coming soon.</p>`;

  input.value = "";
}
Add ask.js for chat UI
