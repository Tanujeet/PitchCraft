import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function GET(
  req: NextResponse,
  context: { params: { projectId: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 402 });
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
