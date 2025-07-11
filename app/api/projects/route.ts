import prisma from "@/lib/primsa";
import { auth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";




export async function POST(req: NextResponse) {
    const { userId } = await auth();
   
    if (!userId) {
        return new NextResponse("Unauthorised", { status: 401 });
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
        return NextResponse.json(newProject, { status: 200 });
    } catch (err) {
        console.error(err)
    }
} 