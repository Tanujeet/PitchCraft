import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { OpenAI } from "openai";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function GET(context: {
  params: { projectsId: string };
}): Promise<NextResponse> {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { projectsId: projectId } = context.params;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { collaborators: true },
    });

    if (
      !project ||
      (project.ownerId !== userId &&
        !project.collaborators.some((c) => c.userId === userId))
    ) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const slides = await prisma.slide.findMany({
      where: { projectId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ slides });
  } catch (e) {
    console.error("Error fetching slides:", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  context: { params: { projectsId: string } }
): Promise<NextResponse> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { projectsId: projectId } = context.params;
    const { idea, description } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: "No idea provided" }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { collaborators: true },
    });

    if (
      !project ||
      (project.ownerId !== userId &&
        !project.collaborators.some((c) => c.userId === userId))
    ) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Generate prompt for OpenAI
    const prompt = `Create a startup pitch deck with exactly 10 slides for this idea: "${
      description || idea
    }". Return the result as a valid JSON array of objects like:
[
  { "title": "Slide Title", "content": "Slide content..." },
  ...
]`;

    const aiRes = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content:
            "You are a professional startup pitch deck generator. Always respond with a valid JSON array of 10 slides, each having 'title' and 'content'.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const slidesJson = aiRes.choices[0].message?.content?.trim();

    if (!slidesJson) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    let slides: { title: string; content: any }[];

    try {
      slides = JSON.parse(slidesJson);
    } catch (err) {
      console.error("❌ Failed to parse OpenAI response:", slidesJson);
      return NextResponse.json(
        { error: "Failed to parse slide data" },
        { status: 500 }
      );
    }

    // Save existing slides as versions
    const existingSlides = await prisma.slide.findMany({
      where: { projectId },
    });

    for (const slide of existingSlides) {
      await prisma.slideVersion.create({
        data: {
          slideId: slide.id,
          content:
            slide.content === null || slide.content === undefined
              ? Prisma.JsonNull
              : slide.content,
          createdById: userId,
        },
      });
    }

    // Remove old slides
    await prisma.slide.deleteMany({ where: { projectId } });

    // Create new slides
    const newSlides = await Promise.all(
      slides.map((slide, index) =>
        prisma.slide.create({
          data: {
            projectId,
            title: slide.title,
            content:
              slide.content === null || slide.content === undefined
                ? Prisma.JsonNull
                : slide.content,
            order: index,
          },
        })
      )
    );

    return NextResponse.json({ slides: newSlides });
  } catch (e) {
    console.error("🔥 Error generating slides:", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
