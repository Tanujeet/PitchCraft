import { NextRequest } from "next/server";
import { OpenAIStream, streamText } from "ai";
import openai from "@/lib/openai";

export const runtime = "edge"; // Use if you're deploying on Vercel or using edge functions

export async function POST(req: NextRequest) {
  const { idea } = await req.json();

  const prompt = `
You are a startup pitch deck generator.
Generate 10 slide ideas for the following startup in JSON format as an array of 10 items.
Each item must have "title" and "content".

Startup idea: "${idea}"

Respond ONLY as a JSON array like:
[
  { "title": "Slide 1", "content": "..." },
  ...
]
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You generate structured JSON pitch slides with a title and content for each.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const stream = OpenAIStream(response);
  return  streamText(stream);
}
