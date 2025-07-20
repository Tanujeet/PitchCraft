import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { userId } = await auth()
    if (!userId) {
        return new NextResponse("Unauthorised", { status: 401 })
    }
    
    const { searchParams } = new URL(req.url)
    const projectId= searchParams.get("projectID")
}