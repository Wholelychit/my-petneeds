import OpenAI from "openai";

// Use your Cloudflare environment variable (never hardcode the key)
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    const { question } = await request.json();

    try {
      const response = await openai.responses.create({
        model: "gpt-5-nano",
        input: question
      });

      return new Response(JSON.stringify({ answer: response.output_text }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        headers: { "Content-Type": "application/json" },
        status: 500
      });
    }
  }
};
