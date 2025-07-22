import { generateSlidesFromIdea } from "@/lib/generateslides";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ projectId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  const { projectId } = await paramsPromise;

  try {
    const collaborator = await prisma.collaborator.findFirst({
      where: { projectId, userId },
    });
    if (!collaborator) {
      return new NextResponse("Forbidden", { status: 403 });
    }
    if (collaborator.role !== "OWNER" && collaborator.role !== "EDITOR") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });
    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    const slides = await generateSlidesFromIdea(project.title);

    await prisma.slide.deleteMany({ where: { projectId } });

    await prisma.$transaction(
      slides.map((slide, index) =>
        prisma.slide.create({
          data: {
            title: slide.title,
            content: slide.content,
            order: index,
            projectId,
          },
        })
      )
    );
    return NextResponse.json({ slides });
  } catch (e) {
    console.error("Forbidden", e);
  }
}
