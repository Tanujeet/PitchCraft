import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { assert } from "console";
import { NextResponse } from "next/server";


export async function GET(context: { params: { projectId: string } }) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }
  
  
  
  try {
      const { projectId } = context.params
      

          const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
              collaborators: true,
            },
          });
      
          if (
            !project ||
            (project.ownerId !== userId &&
              !project.collaborators.some((c) => c.userId === userId))
          ) {
            return new NextResponse("Forbidden", { status: 403 });
      }
      
      const slides = await prisma.slide.findMany({
          where:{projectId},orderBy:{order:"asc"}
      })
      return NextResponse.json({slides})

    }catch(e){  console.error("Error fetching slides:", e);
    return new NextResponse("Internal Server Error", { status: 500 });}
}


export async function POST() {
     const { userId } = await auth();
     if (!userId) {
       return new NextResponse("Unauthorised", { status: 401 });
    }
    
    try{}catch(e){}
}