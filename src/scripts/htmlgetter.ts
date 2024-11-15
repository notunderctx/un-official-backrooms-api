import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

interface Level {
  href: string;
  text: string;
  title: string;
}

interface LevelHtml {
  href: string;
  text: string;
  title: string;
  htmlContent: string;
}

async function fetchWithRetry(
  url: string,
  retries: number = 3
): Promise<string> {
  let attempts = 0;
  while (attempts < retries) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.text();
      } else {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
    } catch (error) {
      attempts++;
      if (attempts >= retries) {
        return "";
      }
    }
  }
  return "";
}

async function fetchAndSaveLevelHtml(input, output): Promise<void> {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const cacheFilePath = path.join(__dirname, "cache", input);
    const adjustedCachePath = cacheFilePath.replace("dist", "");

    const cacheFile = fs.existsSync(adjustedCachePath)
      ? fs.readFileSync(adjustedCachePath, "utf8")
      : "{}";
    const levels: Record<string, Level> = JSON.parse(cacheFile);

    const levelData: LevelHtml[] = [];
    let lastProcessed = 0;

    const progressFilePath = path.join(__dirname, "cache", "progress.json");
    if (fs.existsSync(progressFilePath)) {
      const progress = fs.readFileSync(progressFilePath, "utf8");
      lastProcessed = parseInt(progress, 10);
    }

    let currentIndex = 0;

    for (const level of Object.values(levels)) {
      if (currentIndex >= lastProcessed) {
        const htmlContent = await fetchWithRetry(level.href, 3);
        if (htmlContent) {
          levelData.push({
            href: level.href,
            text: level.text,
            title: level.title,
            htmlContent,
          });
        }
        console.log(
          `Processed ${currentIndex + 1} of ${Object.keys(levels).length}`
        );
      }
      currentIndex++;
    }

    fs.writeFileSync(progressFilePath, currentIndex.toString());
    const outputFilePath = path
      .join(__dirname, "cache", output)
      .replace("dist", "");
    fs.writeFileSync(outputFilePath, JSON.stringify(levelData, null, 2));
    console.log("Level HTML data saved ");
  } catch (error) {
    console.error(
      "Error processing data:",
      error instanceof Error ? error.message : ""
    );
  }
}

fetchAndSaveLevelHtml("phenomena_links.json", "phenomena.json");
