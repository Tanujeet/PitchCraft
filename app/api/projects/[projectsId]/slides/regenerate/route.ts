import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(
  req: NextRequest,
  context: { params: Record<string, string> }
): Promise<NextResponse> {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const projectId = context.params.projectsId;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { collaborators: true },
    });

    if (
      !project ||
      (project.ownerId !== userId &&
        !project.collaborators.some((c) => c.userId === userId))
    ) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const allowed = ["PRO", "TRIAL"];
    if (!allowed.includes(user.subscriptionStatus)) {
      return NextResponse.json(
        {
          error: "Upgrade required to use slide regeneration",
          upgradeUrl: "/pricing",
        },
        { status: 403 }
      );
    }

    const existingSlides = await prisma.slide.findMany({
      where: { projectId },
    });

    for (const slide of existingSlides) {
      await prisma.slideVersion.create({
        data: {
          slideId: slide.id,
          content: JSON.parse(JSON.stringify(slide.content)),
          createdById: userId,
        },
      });
    }

    const prompt = `Regenerate a 10-slide startup pitch deck for the following idea:\n"${project.description}". Return an array of objects with 'title' and 'content'.`;

    const aiRes = await openai.chat.completions.create({
      model: "gpt-4",
      temperature: 0.7,
      messages: [
        { role: "system", content: "You are a pitch deck expert." },
        { role: "user", content: prompt },
      ],
    });

    const slidesJson = aiRes.choices[0].message?.content;
    const newSlides: { title: string; content: any }[] = JSON.parse(
      slidesJson || "[]"
    );

    if (!Array.isArray(newSlides) || newSlides.length !== 10) {
      return new NextResponse("Invalid slide data", { status: 400 });
    }

    await prisma.slide.deleteMany({ where: { projectId } });

    const createdSlides = await Promise.all(
      newSlides.map((slide, index) =>
        prisma.slide.create({
          data: {
            projectId,
            title: slide.title,
            content: slide.content,
            order: index,
          },
        })
      )
    );

    return NextResponse.json({ slides: createdSlides });
  } catch (e) {
    console.error("Failed to regenerate", e);
    return new NextResponse("Failed to regenerate", { status: 500 });
  }
}
