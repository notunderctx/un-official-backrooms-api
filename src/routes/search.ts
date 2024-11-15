import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cacheDir = path
  .join(__dirname, "cache")
  .replace("dist/", "")
  .replace("routes/", "");

function searchInJsonFiles(query) {
  const results: any = [];
  const files = fs
    .readdirSync(cacheDir)
    .filter((file) => file.endsWith(".json"));

  files.forEach((file) => {
    const filePath = path.join(cacheDir, file);
    const fileContent = JSON.parse(fs.readFileSync(filePath, "utf8"));

    fileContent.forEach((item, index) => {
      const matches = {};
      Object.entries(item).forEach(([key, value]) => {
        if (
          key !== "htmlContent" &&
          key !== "description" &&
          typeof value === "string" &&
          value.toLowerCase().includes(query.toLowerCase())
        ) {
          matches[key] = value;
        }
      });

      if (Object.keys(matches).length > 0) {
        results.push({
          index,
          // matches,
          matches: Object.fromEntries(
            Object.entries(item).filter(([key]) => key !== "htmlContent")
          ),
        });
      }
    });
  });

  return results;
}

router.get("/", (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const searchResults = searchInJsonFiles(query);
    return res.json({ query, results: searchResults });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
