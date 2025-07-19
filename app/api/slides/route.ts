import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return new NextResponse("Project ID is required", { status: 400 });
  }

  try {
    const slides = await prisma.slide.findMany({
      where: { projectId: projectId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(slides);
  } catch (e) {
    console.error("Failed to fetch slides", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
