import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { userId } = await auth()
    if (!userId) {
        return new NextResponse("Unauthorized",{status:401})
    }
    try {

        const totalPitch = await prisma.project.count({
            where:{ownerId:userId}
        })

        const totalSlides = await prisma.slide.count({
            where:{project:{ownerId:userId}}
        })

        const avgSlides = totalPitch > 0 ? totalSlides / totalPitch : 0;
           return NextResponse.json({
             totalPitch,
             totalSlides,
             averageSlidesPerPitch: avgSlides,
           });
    } catch (e) {
       console.error("Failed to fetch summary data", e);
       return new NextResponse("Internal Server Error", { status: 500 });
        
    }
    
}