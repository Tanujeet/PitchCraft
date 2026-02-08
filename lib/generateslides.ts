// DEBUG: test change Feb 2026

import axios from "axios";

type Slide = {
  title: string;
  content: string;
};

export async function generateSlidesFromIdea(idea: string) {
  const res = await axios.post(
    "https://api.cohere.com/v1/chat",
    {
      model: "command-a-03-2025", // 🔥 EXACT MODEL ID
      message: `
Generate a 10-slide startup pitch deck for the idea: "${idea}"

Format strictly:

Slide 1:
Title: ...
- Bullet 1
- Bullet 2
- Bullet 3

Continue till Slide 10.
No extra text.
      `,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
        "Cohere-Version": "2024-12-06",
      },
    },
  );

  const raw = res.data.text || "";

  return raw
    .split(/Slide \d+:/i)
    .filter(Boolean)
    .map((chunk: string) => {
      const title = chunk.match(/Title:\s*(.+)/i)?.[1] ?? "Untitled";
      const bullets = [...chunk.matchAll(/-\s*(.+)/g)].map((m) => m[1]);
      return { title, content: bullets.join("\n") };
    });
}

