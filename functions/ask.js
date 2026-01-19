import OpenAI from "openai";

export async function onRequestGet({ request, env }) {
  if (!env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ answer: "Server configuration error." }),
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const question = url.searchParams.get("q");

  if (!question) {
    return new Response(
      JSON.stringify({ answer: "Please enter a question." }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const client = new OpenAI({
      apiKey: env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-5-nano",
      input: `
You are Petneeds.ai.
Provide educational pet care guidance only.
Do NOT diagnose or prescribe.
Always recommend a licensed veterinarian for medical concerns.

User question: ${question}
`
    });

    return new Response(
      JSON.stringify({
        answer: response.output_text || "No response available."
      }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ answer: "AI service error." }),
      { status: 500 }
    );
  }
}
