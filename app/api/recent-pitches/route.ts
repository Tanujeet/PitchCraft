import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const { userId } = await auth()
    if (!userId) {
        return new NextResponse("Unauthorised",{status:401})
    }
    

    try {

        const recentPitches = await prisma.project.findMany({where:{ownerId:userId},orderBy:{createdAt:"desc"},take:5,select:{id:true,title:true,createdAt:true}})
        
    return NextResponse.json(recentPitches);
    } catch (e) {
        console.error("Failed to fetch pitches", e)
        return new NextResponse("Internal Server Error", { status: 500 });
        
    }
}