import OpenAI from "openai";

export async function onRequest(context) {
  const { request, env } = context;

  // Read question from URL
  const url = new URL(request.url);
  const question = url.searchParams.get("q");

  if (!question) {
    return new Response(
      JSON.stringify({ answer: "Please enter a question." }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  // Initialize OpenAI securely with Cloudflare secret
  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY
  });

  try {
    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: `
You are Petneeds.ai, a responsible pet care assistant.
Provide general cat care information only.
Do NOT diagnose, prescribe medication, or replace a veterinarian.
Always include a gentle disclaimer.

User question:
${question}
      `
    });

    return new Response(
      JSON.stringify({
        answer: response.output_text
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({
        answer: "Sorry — the AI service is temporarily unavailable."
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
