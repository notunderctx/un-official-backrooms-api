var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
function fetchWithRetry(url_1) {
    return __awaiter(this, arguments, void 0, function* (url, retries = 3) {
        let attempts = 0;
        while (attempts < retries) {
            try {
                const response = yield fetch(url);
                if (response.ok) {
                    return yield response.text();
                }
                else {
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }
            }
            catch (error) {
                attempts++;
                if (attempts >= retries) {
                    return "";
                }
            }
        }
        return "";
    });
}
function fetchAndSaveLevelHtml(input, output) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const __dirname = path.dirname(fileURLToPath(import.meta.url));
            const cacheFilePath = path.join(__dirname, "cache", input);
            const adjustedCachePath = cacheFilePath.replace("dist", "");
            const cacheFile = fs.existsSync(adjustedCachePath)
                ? fs.readFileSync(adjustedCachePath, "utf8")
                : "{}";
            const levels = JSON.parse(cacheFile);
            const levelData = [];
            let lastProcessed = 0;
            const progressFilePath = path.join(__dirname, "cache", "progress.json");
            if (fs.existsSync(progressFilePath)) {
                const progress = fs.readFileSync(progressFilePath, "utf8");
                lastProcessed = parseInt(progress, 10);
            }
            let currentIndex = 0;
            for (const level of Object.values(levels)) {
                if (currentIndex >= lastProcessed) {
                    const htmlContent = yield fetchWithRetry(level.href, 3);
                    if (htmlContent) {
                        levelData.push({
                            href: level.href,
                            text: level.text,
                            title: level.title,
                            htmlContent,
                        });
                    }
                    console.log(`Processed ${currentIndex + 1} of ${Object.keys(levels).length}`);
                }
                currentIndex++;
            }
            fs.writeFileSync(progressFilePath, currentIndex.toString());
            const outputFilePath = path
                .join(__dirname, "cache", output)
                .replace("dist", "");
            fs.writeFileSync(outputFilePath, JSON.stringify(levelData, null, 2));
            console.log("Level HTML data saved ");
        }
        catch (error) {
            console.error("Error processing data:", error instanceof Error ? error.message : "");
        }
    });
}
fetchAndSaveLevelHtml("phenomena_links.json", "phenomena.json");
