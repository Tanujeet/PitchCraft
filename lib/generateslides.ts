import axios from "axios";

type Slide = {
  title: string;
  content: string;
};

export async function generateSlidesFromIdea(idea: string): Promise<Slide[]> {
  // ...same code

  const response = await axios.post(
    "https://api.cohere.ai/v1/generate",
    {
      model: "command-r-plus",
      prompt: `Generate a 5-slide startup pitch deck for the idea: "${idea}". Each slide should include a title and 2-3 bullet points. Format:
Slide 1:
Title: ...
- Bullet 1
- Bullet 2

Slide 2:
Title: ...
- Bullet 1
...

(Repeat up to Slide 5)`,
      temperature: 0.7,
      max_tokens: 500,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const raw = response.data.generations?.[0]?.text || "";

  // Parse raw text into slide objects
  const slideChunks = raw.split(/Slide \d+:/i).filter(Boolean);

  const slides = slideChunks.map((chunk: string) => {
    const titleMatch = chunk.match(/Title:\s*(.+)/i);
    const bulletMatches = [...chunk.matchAll(/-\s*(.+)/g)];

    const title = titleMatch?.[1]?.trim() || "Untitled Slide";
    const content = bulletMatches.map((m) => m[1]).join("\n");

    return {
      title,
      content,
    };
  });

  return slides;
}
