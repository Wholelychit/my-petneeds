export async function onRequestPost({ request, env }) {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Missing message" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        input: `
You are Petneeds.ai.
Provide responsible, educational pet care guidance.
Do NOT give medical diagnoses or treatment.
Always recommend a licensed veterinarian for medical concerns.

User question: ${message}
`
      })
    });

    const data = await aiResponse.json();

    return new Response(
      JSON.stringify({ reply: data.output_text || "No response available." }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
