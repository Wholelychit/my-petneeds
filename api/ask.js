import OpenAI from "openai";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ reply: "Invalid JSON." }), { headers: { "Content-Type": "application/json" } });
    }

    const { message } = body;
    if (!message) {
      return new Response(JSON.stringify({ reply: "Please enter a question." }), { headers: { "Content-Type": "application/json" } });
    }

    const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

    try {
      const response = await openai.responses.create({
        model: "gpt-5-nano",
        input: `
You are Petneeds.ai, a responsible pet care assistant.
Provide general pet care guidance only.
Do NOT diagnose, prescribe medication, or replace a veterinarian.
Always include a gentle disclaimer.

User question:
${message}
        `
      });

      const reply = response.output_text || "Sorry, no response.";

      return new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json" } });
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ reply: "AI service temporarily unavailable." }), { headers: { "Content-Type": "application/json" } });
    }
  }
};
