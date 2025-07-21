import puppeteer from "puppeteer";
import { Slide } from "@/types";

export async function generatePdfFromSlides(slides: Slide[]): Promise<Buffer> {
  // 1. Safety check
  if (!slides || slides.length === 0) {
    throw new Error("Slides array is empty");
  }

  // 2. Build HTML string
  const html = `
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 2rem;
            font-size: 16px;
            color: #000;
          }
          .slide {
            page-break-after: always;
            border: 1px solid #ccc;
            padding: 1rem;
            margin-bottom: 2rem;
          }
        </style>
      </head>
      <body>
        ${slides
          .map(
            (slide) => `
              <div class="slide">
                <h2>${slide.title}</h2>
                <p>${slide.content}</p>
              </div>
            `
          )
          .join("")}
      </body>
    </html>
  `;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"], // For Next.js in serverless
    });

    const page = await browser.newPage();

    // 3. Set content and wait properly
    await page.setContent(html, {
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
    });

    await new Promise((res) => setTimeout(res, 500));
    // Ensure rendering finishes

    const pdfBuffer = Buffer.from(
      await page.pdf({ format: "A4", printBackground: true })
    );

    await browser.close();

    return pdfBuffer;
  } catch (err) {
    console.error("🧨 PDF generation failed:", err);
    throw new Error("Failed to generate PDF");
  }
}
