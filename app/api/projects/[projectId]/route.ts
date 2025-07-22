// /app/api/project/[projectId]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  req: Request,
  { params: paramsPromise }: { params: Promise<{ projectId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { projectId } = await paramsPromise;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        collaborators: true,
      },
    });

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    const isOwner = project.ownerId === userId;
    const isCollaborator = project.collaborators.some(
      (c) => c.userId === userId
    );

    if (!isOwner && !isCollaborator) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.slide.deleteMany({ where: { projectId } });
    await prisma.collaborator.deleteMany({ where: { projectId } });
    await prisma.project.delete({ where: { id: projectId } });

    return new NextResponse("Project deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Failed to delete project", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
