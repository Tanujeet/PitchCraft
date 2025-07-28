import { generateSlidesFromIdea } from "@/lib/generateslides";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { clerkClient } from "@clerk/clerk-sdk-node";

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
    // Get user data from Clerk
    const user = await clerkClient.users.getUser(userId);
    const email =
      user?.emailAddresses?.[0]?.emailAddress || `guest_${userId}@example.com`;
    const name = user?.firstName || "Guest User";
    const imageUrl = user?.imageUrl || null;

    // 1. Create or update user
    await prisma.user.upsert({
      where: { id: userId },
      update: {
        lastLogin: new Date(),
      },
      create: {
        id: userId,
        email,
        name,
        imageUrl,
        lastLogin: new Date(),
      },
    });

    // 2. Generate slides
    const slides = await generateSlidesFromIdea(idea);

    // 3. Create project
    const project = await prisma.project.create({
      data: {
        title: idea.slice(0, 50),
        ownerId: userId,
        shareId: nanoid(10),
      },
    });

    // 4. Add user as owner collaborator
    await prisma.collaborator.create({
      data: {
        projectId: project.id,
        userId,
        role: "OWNER",
      },
    });

    // 5. Save slides in DB
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

    // 6. Return response
    return NextResponse.json({
      projectId: project.id,
      slides,
    });
  } catch (e) {
    console.error("Failed to create project and slides", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
