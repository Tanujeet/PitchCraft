import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { idea, description } = await req.json();
  if (!idea) {
    return new NextResponse("Idea is required", { status: 400 });
  }

  // Step 1: Auto-create project
  const project = await prisma.project.create({
    data: {
      title: idea.slice(0, 40),
      description: description || idea,
      ownerId: userId,
      shareId: nanoid(8),
    },
  });

  // Step 2: Generate slides from AI
  const prompt = `Create a startup pitch deck with 10 slides for this idea: "${idea}". Each slide must be in this format:
[
  { "title": "Slide Title", "content": "Slide content" },
  ...
]`;

  const aiRes = await openai.chat.completions.create({
    model: "gpt-4",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content:
          "You are a startup pitch deck expert. Respond with JSON array of 10 slides, each with 'title' and 'content'.",
      },
      { role: "user", content: prompt },
    ],
  });

  let slidesJson = aiRes.choices[0].message?.content?.trim();

  let slides;
  try {
    slides = JSON.parse(slidesJson || "[]");
  } catch (err) {
    return new NextResponse("Invalid AI response", { status: 500 });
  }

  if (!Array.isArray(slides) || slides.length !== 10) {
    return new NextResponse("Expected 10 slides", { status: 400 });
  }

  const createdSlides = await Promise.all(
    slides.map((slide, index) =>
      prisma.slide.create({
        data: {
          projectId: project.id,
          title: slide.title,
          content: slide.content,
          order: index,
        },
      })
    )
  );

  return NextResponse.json({
    projectId: project.id,
    slides: createdSlides,
  });
}
