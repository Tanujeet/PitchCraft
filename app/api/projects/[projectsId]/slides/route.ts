import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import openai from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";

export async function GET(context: { params: { projectId: string } }) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  try {
    const { projectId } = context.params;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        collaborators: true,
      },
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
  context: { params: { projectId: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  const { projectId } = context.params;
  const { idea, description } = await req.json();
  try {
    if (!idea) {
      return NextResponse.json({ error: "No idea provided" }, { status: 400 });
    }
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        collaborators: true,
      },
    });

    if (
      !project ||
      (project.ownerId !== userId &&
        !project.collaborators.some((c) => c.userId === userId))
    ) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const prompt = `Create a 10-slide startup pitch deck for this idea:\n"${
      description || idea
    }". Return an array of slides in JSON with fields: title and content.`;

    const aiRes = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.7,
      messages: [
        { role: "system", content: "You are a pitch deck expert." },
        { role: "user", content: prompt },
      ],
    });

    const slidesJson = aiRes.choices[0].message?.content;
    const slides: { title: string; content: any }[] = JSON.parse(
      slidesJson || "[]"
    );

    const existingSlides = await prisma.slide.findMany({
      where: { projectId },
    });

    for (const slide of existingSlides) {
      await prisma.slideVersion.create({
        data: {
          slideId: slide.id,
          content: JSON.parse(JSON.stringify(slide.content)),

          createdById: userId,
        },
      });
    }

    await prisma.slide.deleteMany({ where: { projectId } });

    const newSlides = await Promise.all(
      slides.map((slide, index) =>
        prisma.slide.create({
          data: {
            projectId,
            title: slide.title,
            content: slide.content,
            order: index,
          },
        })
      )
    );
    return NextResponse.json({ slides: newSlides });
  } catch (e) {
    console.error("Error generating slides:", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}