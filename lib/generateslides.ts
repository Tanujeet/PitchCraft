import axios from "axios";

type Slide = {
  title: string;
  content: string;
};

export async function generateSlidesFromIdea(idea: string): Promise<Slide[]> {
  const response = await axios.post(
    "https://api.cohere.ai/v1/generate",
    {
      model: "command-r-plus",
      prompt: `You're an expert pitch deck creator.
Generate a **10-slide** startup pitch deck for the idea: "${idea}".
Each slide should contain a **Slide Title** and **3 to 4 detailed bullet points**.
Use this format:

Slide 1:
Title: ...
- Bullet 1
- Bullet 2
- Bullet 3

Slide 2:
Title: ...
- Bullet 1
...

(Continue up to Slide 10). Keep bullets insightful and professional.`,
      temperature: 0.6, // Less randomness, better structure
      max_tokens: 1000, // More room for content
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
