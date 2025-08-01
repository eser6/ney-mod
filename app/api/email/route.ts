export default async function handler(req, res) {
  const { input } = req.body;

  const prompt = `Write a persuasive cold email for this business case:\n${input}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();
  const output = data.choices?.[0]?.message?.content || "No response.";
  res.status(200).json({ output });
}
