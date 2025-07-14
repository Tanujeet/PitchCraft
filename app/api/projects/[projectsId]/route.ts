import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// ✅ GET Project with slides & collaborators
export async function GET(
  req: NextRequest,
  { params }: { params: { projectsId: string } }
): Promise<NextResponse> {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const projectId = params.projectsId;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      slides: true,
      collaborators: { include: { user: true } },
    },
  });

  if (!project) {
    return new NextResponse("Project not found", { status: 404 });
  }

  const isOwner = project.ownerId === userId;
  const isCollaborator = project.collaborators.some((c) => c.userId === userId);

  if (!isOwner && !isCollaborator) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.json(project);
}

// ✅ PATCH Project details (only owner)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { projectsId: string } }
): Promise<NextResponse> {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const projectId = params.projectsId;
    const { title, description, theme } = await req.json();

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        collaborators: { include: { user: true } },
      },
    });

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    if (project.ownerId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: { title, description, theme },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("Error updating project:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// ✅ DELETE Project and all related data (only owner)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectsId: string } }
): Promise<NextResponse> {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const projectId = params.projectsId;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { ownerId: true },
  });

  if (!project) {
    return new NextResponse("Project not found", { status: 404 });
  }

  if (project.ownerId !== userId) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    await prisma.$transaction([
      prisma.slideVersion.deleteMany({
        where: { slide: { projectId } },
      }),
      prisma.slide.deleteMany({ where: { projectId } }),
      prisma.collaborator.deleteMany({ where: { projectId } }),
      prisma.publicViewLog.deleteMany({ where: { projectId } }),
      prisma.project.delete({ where: { id: projectId } }),
    ]);

    return new NextResponse("Project and related data deleted", {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
