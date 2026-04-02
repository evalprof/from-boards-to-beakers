import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const API_KEY = process.env.GOOGLE_API_KEY;
if (!API_KEY) {
  console.error("Set GOOGLE_API_KEY environment variable");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-image",
  generationConfig: { responseModalities: ["Text", "Image"] },
});

const GAMES_DIR = path.resolve("public/games");
const OUTPUT_DIR = path.resolve("public/games/extended");

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Get all webp files (skip extended/ subdirectory)
const images = fs
  .readdirSync(GAMES_DIR)
  .filter((f) => f.endsWith(".webp") && !f.startsWith("."));

const PROMPT = `Take this board game box cover image and extend it to fill a 16:9 wide landscape canvas (roughly 800x450 pixels).
Keep the original box art fully visible and centered.
Extend the visual elements, colors, and artistic style naturally outward to fill the wider frame.
Do NOT add any text, logos, or watermarks.
The extended areas should look like a natural continuation of the cover art's background and visual theme.
Return ONLY the extended image.`;

async function extendImage(filename) {
  const inputPath = path.join(GAMES_DIR, filename);
  const outputPath = path.join(OUTPUT_DIR, filename.replace(".webp", ".png"));

  // Skip if already generated
  if (fs.existsSync(outputPath)) {
    console.log(`  ⏭  ${filename} — already exists, skipping`);
    return;
  }

  const imageData = fs.readFileSync(inputPath);
  const base64 = imageData.toString("base64");

  try {
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/webp",
          data: base64,
        },
      },
      PROMPT,
    ]);

    const response = result.response;
    const parts = response.candidates?.[0]?.content?.parts || [];

    for (const part of parts) {
      if (part.inlineData) {
        const imgBuffer = Buffer.from(part.inlineData.data, "base64");
        fs.writeFileSync(outputPath, imgBuffer);
        console.log(`  ✅ ${filename} → ${path.basename(outputPath)}`);
        return;
      }
    }

    console.log(`  ⚠️  ${filename} — no image in response`);
  } catch (err) {
    console.error(`  ❌ ${filename} — ${err.message}`);
  }
}

console.log(`\nExtending ${images.length} game images...\n`);

// Process sequentially to avoid rate limits
for (const img of images) {
  await extendImage(img);
  // Small delay between requests
  await new Promise((r) => setTimeout(r, 2000));
}

console.log("\nDone! Extended images saved to public/games/extended/\n");
