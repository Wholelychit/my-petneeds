import OpenAI from "openai";

export async function onRequest(context) {
  const { request, env } = context;

  // Get question from query string
  const url = new URL(request.url);
  const question = url.searchParams.get("q");

  if (!question) {
    return new Response(
      JSON.stringify({ answer: "Please enter a question." }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  // Initialize OpenAI with Cloudflare environment secret
  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY
  });

  try {
    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: `
You are Petneeds.ai, a responsible pet care assistant.
Provide general pet care guidance only.
Do NOT diagnose, prescribe medication, or replace a veterinarian.
Always include a gentle disclaimer.

User question:
${question}
      `
    });

    // For GPT-5-mini style responses, use `response.output_text`
    const answer = response.output_text || "Sorry, no response from AI.";

    return new Response(JSON.stringify({ answer }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    console.error("OpenAI error:", err);
    return new Response(
      JSON.stringify({
        answer: "Sorry — the AI service is temporarily unavailable."
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}

