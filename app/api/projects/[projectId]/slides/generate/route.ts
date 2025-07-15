import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
    const { userId } = await auth()
    if (!userId) {
        return new NextResponse("Unauthorised",{status:401})
    }
    
    const projectId = params.projectId
  

    try {
        
    } catch (e)
    {console.error("Forbidden",e)
        
    }
}