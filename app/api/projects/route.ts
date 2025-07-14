import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server"; // ❗️Use `NextRequest` for incoming request

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title || typeof title !== "string") {
      return new NextResponse("Invalid title", { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        ownerId: userId,
        shareId: nanoid(8),
      },
    });

    return NextResponse.json(newProject, { status: 201 }); // 201 for "Created"
  } catch (err) {
    console.error("Error creating project:", err);
    return new NextResponse("Internal Server Error", { status: 500 }); // ❗️Always return a response
  }
}
