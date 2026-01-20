import OpenAI from "openai";

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const { message } = await request.json();

      if (!message) {
        return new Response(
          JSON.stringify({ reply: "Please enter a question." }),
          { headers: { "Content-Type": "application/json" } }
        );
      }

      // Initialize OpenAI with environment variable
      const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

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

      return new Response(
        JSON.stringify({ reply: response.output_text || "No response from AI." }),
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error("Worker /api/ask error:", err);
      return new Response(
        JSON.stringify({ reply: "AI service temporarily unavailable." }),
        { headers: { "Content-Type": "application/json" } }
      );
    }
  }
};
