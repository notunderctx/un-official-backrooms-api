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
      .join(__dirname, "../cache/processed_object.json")
      .replace("dist/", "");
    console.log(cacheFilePath);

    if (!fs.existsSync(cacheFilePath)) {
      return res.status(404).json({ error: "Cache file not found" });
    }

    const data = JSON.parse(fs.readFileSync(cacheFilePath, "utf-8"));
    const object = data.find((entry) =>
      entry.href.includes(`object-${number}`)
    );

    if (!object) {
      return res
        .status(404)
        .json({ error: `Object number : ${number} not found` });
    }
    object.description = prettifyAndClean(object.description);

    return res.json(object);
  } catch (error: any) {
    console.log("Error retrieving object :", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
