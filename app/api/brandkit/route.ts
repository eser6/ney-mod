export const runtime = "edge";

export async function POST(req: Request) {
  const { input } = await req.json();

  const prompt = `
Generate a simple brand kit for this business:
${input}

Include:
- Brand name
- Slogan
- Brand voice
- Ideal color scheme
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
      temperature: 0.8,
    }),
  });

  const data = await response.json();
  const output = data.choices?.[0]?.message?.content ?? "Error generating brand kit.";
  return new Response(JSON.stringify({ output }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
