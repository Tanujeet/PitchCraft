import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextResponse,
  context: { params: { projectId: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  const { projectId } = context.params;

  const fetchProject = await prisma.project.findUnique({
    where: { id: projectId },
    include: { slides: true, collaborators: { include: { user: true } } },
  });

  if (!fetchProject) {
    return new NextResponse("Project not found", { status: 404 });
  }

  const isOwner = fetchProject.ownerId === userId;
  const isCollaborator = fetchProject.collaborators.some(
    (c) => c.userId === userId
  );

  if (!isOwner && !isCollaborator) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.json(fetchProject);
}

export async function PATCH(
  req: NextRequest,
  context: { params: { projectId: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  try {
    const { projectId } = context.params;
    const body = await req.json();
    const { title, description, theme } = body;

    const fetchProject = await prisma.project.findUnique({
      where: { id: projectId },
      include: { slides: true, collaborators: { include: { user: true } } },
    });
    if (!fetchProject) {
      return new NextResponse("Project not found", { status: 404 });
    }

    const isOwner = fetchProject.ownerId === userId;
    const isCollaborator = fetchProject.collaborators.some(
      (c) => c.userId === userId
    );

    if (!isOwner) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const updateProject = await prisma.project.update({
      where: { id: projectId },
      data: { title, description, theme },
    });

    return NextResponse.json({ updateProject }, { status: 200 });
  } catch (err) {
    console.error("error updating", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(context: { params: { projectId: string } }) {
  const { userId } = await auth();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const { projectId } = context.params;

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { ownerId: true },
  });

  if (!project) return new NextResponse("Project not found", { status: 404 });
  if (project.ownerId !== userId)
    return new NextResponse("Forbidden", { status: 403 });

  try {
    await prisma.$transaction([
      prisma.slideVersion.deleteMany({
        where: { slide: { projectId } },
      }),
      prisma.slide.deleteMany({
        where: { projectId },
      }),
      prisma.collaborator.deleteMany({
        where: { projectId },
      }),
      prisma.publicViewLog.deleteMany({
        where: { projectId },
      }),
      prisma.project.delete({
        where: { id: projectId },
      }),
    ]);

    return new NextResponse("Project and related data deleted", {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}