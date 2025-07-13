// app/api/generate-slides/route.ts

import { NextRequest, NextResponse } from "next/server";
import openai from "@/lib/openai"; // Your OpenAI config file

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: "No idea provided" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a startup pitch deck generator. Return a JSON array of 10 slides. Each slide should have a title and content. Respond only with JSON.",
        },
        {
          role: "user",
          content: `Generate a 10-slide pitch deck for the following startup idea:\n\n"${idea}"`,
        },
      ],
      temperature: 0.7,
    });

    // Try parsing the JSON (GPT should return JSON array of slides)
    const slides = JSON.parse(response.choices[0].message.content || "[]");

    return NextResponse.json({ slides });
  } catch (error) {
    console.error("Error generating slides:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
