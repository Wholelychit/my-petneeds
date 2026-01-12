import OpenAI from "openai";

const client = new OpenAI({
  apiKey: OPENAI_API_KEY  // automatically comes from Cloudflare
});

export async function onRequest(context) {
  const { request } = context;
  const { searchParams } = new URL(request.url);
  const question = searchParams.get("q") || "";

  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: question,
  });

  return new Response(JSON.stringify({ answer: response.output_text }), {
    headers: { "Content-Type": "application/json" },
  });
}
