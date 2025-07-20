import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateSlidesFromIdea } from "@/lib/generateslides";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { projectId, idea } = await req.json();

  if (!projectId) {
    return new NextResponse("Project ID is required", { status: 400 });
  }

  try {
    // Validate ownership or collaboration
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        collaborators: true,
      },
    });

    if (
      !project ||
      !project.collaborators.some(
        (collab) => collab.userId === userId && collab.role === "OWNER"
      )
    ) {
      return new NextResponse("Not authorized", { status: 403 });
    }

    const generationIdea = idea || project.title;
    if (!generationIdea || generationIdea.trim().length < 5) {
      return new NextResponse("Valid idea is required", { status: 400 });
    }

    // 1. Delete existing slides
    await prisma.slide.deleteMany({
      where: {
        projectId,
      },
    });

    // 2. Generate new slides
    const newSlides = await generateSlidesFromIdea(generationIdea);

    // 3. Save new slides
    await prisma.$transaction(
      newSlides.map((slide, index) =>
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

    return NextResponse.json({ slides: newSlides });
  } catch (error) {
    console.error("Failed to regenerate slides:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
