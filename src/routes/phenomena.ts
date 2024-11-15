import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { prettifyAndClean } from "../scripts/prettify.js";

const router = express.Router();

router.get("/:number", async (req, res) => {
  try {
    const number = req.params.number;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const cacheFilePath = path
      .join(__dirname, "../cache/processed_phenomena.json")
      .replace("dist/", "");
    console.log(cacheFilePath);

    if (!fs.existsSync(cacheFilePath)) {
      return res.status(404).json({ error: "Cache file not found" });
    }

    const data = JSON.parse(fs.readFileSync(cacheFilePath, "utf-8"));
    const phenomena = data.find((entry) =>
      entry.href.includes(`phenomenon-${number}`)
    );

    if (!phenomena) {
      return res
        .status(404)
        .json({ error: `phenomena number : ${number} not found` });
    }
    phenomena.description = prettifyAndClean(phenomena.description);

    return res.json(phenomena);
  } catch (error: any) {
    console.log("Error retrieving object :", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
