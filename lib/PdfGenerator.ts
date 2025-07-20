import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

interface Slide {
  title: string;
  content: string;
}

export async function generatePdfFromSlides(slides: Slide[]): Promise<Buffer> {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: sans-serif; padding: 40px; }
          .slide { page-break-after: always; margin-bottom: 40px; }
          .title { font-size: 24px; font-weight: bold; margin-bottom: 12px; }
          .point { margin-bottom: 8px; }
        </style>
      </head>
      <body>
        ${slides
          .map(
            (slide) => `
              <div class="slide">
                <div class="title">${slide.title}</div>
                ${slide.content
                  .split("\n")
                  .map((point) => `<div class="point">• ${point}</div>`)
                  .join("")}
              </div>
            `
          )
          .join("")}
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
 
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const uint8Pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return Buffer.from(uint8Pdf); 
}
