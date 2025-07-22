import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
import { Slide } from "@/types";

export async function generatePdfFromSlides(slides: Slide[]): Promise<Buffer> {
  if (!slides || slides.length === 0) {
    throw new Error("Slides array is empty");
  }

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
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, {
      waitUntil: ["load", "domcontentloaded", "networkidle0"],
    });

    await new Promise((res) => setTimeout(res, 500));

    const pdfBuffer = await page.pdf({ format: "a4", printBackground: true });

    await browser.close();
    return Buffer.from(pdfBuffer);
  } catch (err) {
    console.error("🧨 PDF generation failed:", err);
    throw new Error("Failed to generate PDF");
  }
}
