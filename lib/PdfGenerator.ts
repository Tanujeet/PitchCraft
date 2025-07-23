// lib/pdf.ts
import axios from "axios";

const BROWSERLESS_API_KEY = process.env.BROWSERLESS_API_KEY!; // set this in Vercel env

export async function generatePdfFromSlides(slides: any[]) {
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

  const response = await axios.post(
    `https://chrome.browserless.io/pdf?token=${BROWSERLESS_API_KEY}`,
    {
      html, // the HTML content you want to render as PDF
    },
    {
      responseType: "arraybuffer", // so you get back a binary PDF buffer
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data; // PDF buffer
}
