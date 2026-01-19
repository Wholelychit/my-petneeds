import OpenAI from "openai";

export async function onRequest(context) {
  const { request, env } = context;

  const url = new URL(request.url);
  const question = url.searchParams.get("q");

  if (!question) {
    return json({ answer: "Please enter a question." });
  }

  if (!env.OPENAI_API_KEY) {
    return json({ answer: "Server configuration error." }, 500);
  }

  const client = new OpenAI({
    apiKey: env.OPENAI_API_KEY
  });

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are Petneeds.ai. Provide general pet care guidance only. Do not diagnose, prescribe medication, or replace a veterinarian. Always include a gentle disclaimer."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    const answer =
      response.output?.[0]?.content?.[0]?.text ??
      "Sorry — no response from AI.";

    return json({ answer });

  } catch (err) {
    console.error(err);
    return json(
      { answer: "AI service temporarily unavailable." },
      500
    );
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

