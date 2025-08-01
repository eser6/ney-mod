export const runtime = "edge";

export async function POST(req: Request) {
  const { input } = await req.json();

  const prompt = `
You're an expert Instagram marketer. Write a short, catchy, and engaging Instagram caption based on this input:
${input}

It should:
- Use a bold or trendy tone
- Match modern IG ad style
- Include 2–3 relevant emojis
- End with a call to action
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
      temperature: 0.85,
    }),
  });

  const data = await response.json();
  const output = data.choices?.[0]?.message?.content ?? "Something went wrong.";

  return new Response(JSON.stringify({ output }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
