import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const { userId } = await auth()
    if (!userId) {
        return new NextResponse("Unauthorised",{status:401})
    }

    const { title, description, theme, slides } = await req.json()

    if (!title || !slides) {
       return new NextResponse("title or slides not provided",{status:400})
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
        return NextResponse.json(newProject, { status: 201 });
    } catch (e) {
        console.error("failed to create and save projects", e)
        return new NextResponse("Internal Server Error", { status: 500 });

    }
}