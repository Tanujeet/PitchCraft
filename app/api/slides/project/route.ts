import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const { title, description, theme, slides } = await req.json();

    if (!title || (!slides && !description)) {
      return new NextResponse("title or slides not provided", { status: 400 });
    }

    try {
      const newProject = await prisma.project.create({
        data: {
          title,
          description,
          ownerId: userId,
          shareId: nanoid(8),
          theme: theme || "default",
        },
      });

      const formattedSlides = slides.map(
        (slide: { title: string; content: any }, index: number) => ({
          title: slide.title,
          content: slide.content, // assuming it's already JSON
          order: index,
          projectId: newProject.id,
        })
      );

      const saveSlide = await prisma.slide.createMany({
        data: formattedSlides,
      });

      return NextResponse.json({
        project: newProject,
        message: "Project and slides saved successfully",
      });
    } catch (e) {
      console.error("failed to create and save projects", e);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
}