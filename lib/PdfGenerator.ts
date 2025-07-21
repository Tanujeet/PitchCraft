import puppeteer from "puppeteer"; // ⬅️ Use this in local env
import { Slide } from "@/types";

export async function generatePdfFromSlides(slides: Slide[]): Promise<Buffer> {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 2rem; }
          .slide { page-break-after: always; margin-bottom: 2rem; }
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
      headless: true, // Fully headless
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return pdf;
  } catch (err) {
    console.error("🧨 PDF generation failed:", err);
    throw new Error("Failed to generate PDF");
  }
}
