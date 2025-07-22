import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";



export async function GET(
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

    const slides = await prisma.slide.findMany({
      where: { projectId },
      orderBy: { order: "asc" },
      select: {
        id: true,
        title: true,
        content: true,
        order: true,
        createdAt: true,
      },
    });

    return NextResponse.json(slides);
  } catch (e) {
    console.error("failed to fetch", e);
  }
}
    