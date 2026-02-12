import OpenAI from "openai";

export default {
  async fetch(request, env) {
    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // Parse JSON body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ reply: "Invalid JSON in request." }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    const message = body.message?.trim();
    if (!message) {
      return new Response(
        JSON.stringify({ reply: "Please enter a question." }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Initialize OpenAI
    const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

    try {
      const response = await openai.responses.create({
        model: "gpt-5-nano",
        input: `You are Petneeds.ai, a responsible pet care assistant.
Provide educational guidance only. Do NOT diagnose or prescribe.
Always include a gentle disclaimer.

User question:
${message}`
      });

      // Extract AI reply safely
      const replyText = response.output_text || "Sorry, no response from AI.";

      return new Response(
        JSON.stringify({ reply: replyText }),
        { headers: { "Content-Type": "application/json" } }
      );

    } catch (err) {
      console.error("OpenAI error:", err);
      return new Response(
        JSON.stringify({ reply: "AI service temporarily unavailable." }),
        { headers: { "Content-Type": "application/json" }, status: 503 }
      );
    }
  }
};
