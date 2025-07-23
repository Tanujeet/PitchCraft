import { generatePdfFromSlides } from "@/lib/PdfGenerator";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export const runtime = "nodejs"; // 👈 This is critical

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorised", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");
  if (!projectId) {
    return new NextResponse("Failed to get projectId", { status: 401 });
  }

  try {
    const slides = await prisma.slide.findMany({
      where: { projectId },
      orderBy: { order: "asc" },
    });

    const formattedSlides = slides.map((slide) => ({
      ...slide,
      content:
        typeof slide.content === "string"
          ? slide.content
          : JSON.stringify(slide.content || ""),
    }));

    const pdfBuffer = await generatePdfFromSlides(formattedSlides);

    return new NextResponse(
      new Uint8Array(pdfBuffer), // ✅ Convert Buffer to Uint8Array
      {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="slides.pdf"`,
        },
      }
    );
  } catch (e) {
    console.error("PDF generation failed", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
