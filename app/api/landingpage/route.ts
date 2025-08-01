export const runtime = "edge";

export async function POST(req: Request) {
  const { input } = await req.json();

  const prompt = `
Write full landing page copy for a product or service based on the following idea:
${input}

It should include:
- A strong main headline
- A compelling subheadline
- A short list of 3–5 features or benefits
- A primary call to action
- A closing statement to drive conversions

Style should be clear, confident, and conversion-focused.
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.75,
    }),
  });

  const data = await response.json();
  const output = data.choices?.[0]?.message?.content ?? "Something went wrong.";
  return new Response(JSON.stringify({ output }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
