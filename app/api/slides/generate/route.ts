import { generateSlidesFromIdea } from "@/lib/generateslides";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";



export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { idea } = await req.json();

  if (!idea || idea.trim().length < 5) {
    return new NextResponse("Idea is required", { status: 400 });
  }

  try {
    // 1. Generate slides
    const slides = await generateSlidesFromIdea(idea);

    // 2. Create project
    const project = await prisma.project.create({
      data: {
        title: idea.slice(0, 50),
        ownerId: userId,
        shareId: nanoid(10),
      },
    });

    // 3. Add user as OWNER collaborator
    await prisma.collaborator.create({
      data: {
        projectId: project.id,
        userId,
        role: "OWNER",
      },
    });

    // 4. Save all slides
    await prisma.$transaction(
      slides.map((slide, index) =>
        prisma.slide.create({
          data: {
            title: slide.title,
            content: slide.content,
            projectId: project.id,
            order: index,
          },
        })
      )
    );

    // 5. Return success
    return NextResponse.json({
      projectId: project.id,
      slides,
    });
  } catch (e) {
    console.error("Failed to create project and slides", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
