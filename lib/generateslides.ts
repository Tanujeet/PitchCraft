import { OpenAI } from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SlideSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const SlidesArraySchema = z.array(SlideSchema);

export async function generateSlidesFromIdea(idea: string) {
  if (!idea || idea.trim().length < 5) {
    throw new Error("Invalid idea provided.");
  }

  const prompt = `
You are a pitch deck generator AI. Based on the following startup idea, generate a concise and impactful pitch deck with 6–8 slides. 

Each slide should have a "title" and "content". Avoid generic filler. Focus on clarity and startup-quality language.

Return the result in this exact JSON format:
[
  {
    "title": "Slide title here",
    "content": "Slide content here"
  }
]

Startup idea:
"${idea}"
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "You are an AI that generates high-quality startup pitch decks in structured JSON format.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const rawContent = res.choices[0]?.message?.content;

  if (!rawContent) {
    throw new Error("No response from OpenAI.");
  }

  try {
    const parsed = JSON.parse(rawContent);
    const slides = SlidesArraySchema.parse(parsed); // validate
    return slides;
  } catch (err) {
    console.error("Slide parsing error:", err);
    throw new Error("Failed to parse slides from OpenAI.");
  }
}
