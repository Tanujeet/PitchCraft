import puppeteer from "puppeteer";

export async function generatePdfFromSlides(slides: any[]) {
  const browser = await puppeteer.launch({
    headless: true, // ✅ Use true instead of "new"
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .slide { margin-bottom: 50px; page-break-after: always; }
        </style>
      </head>
      <body>
        ${slides
          .map(
            (slide) =>
              `<div class="slide"><h1>${slide.title}</h1><p>${slide.content}</p></div>`
          )
          .join("")}
      </body>
    </html>
  `;

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();

  return pdfBuffer;
}
