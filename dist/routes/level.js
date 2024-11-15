var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { prettifyAndClean } from "../scripts/prettify.js";
const router = express.Router();
router.get("/:number", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const number = req.params.number;
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const cacheFilePath = path
            .join(__dirname, "../cache/processed_level.json")
            .replace("dist/", "");
        console.log(cacheFilePath);
        if (!fs.existsSync(cacheFilePath)) {
            return res.status(404).json({ error: "Cache file not found" });
        }
        const data = JSON.parse(fs.readFileSync(cacheFilePath, "utf-8"));
        const level = data.find((entry) => entry.href.includes(`level-${number}`));
        if (!level) {
            return res.status(404).json({ error: `Level ${number} not found` });
        }
        level.description = prettifyAndClean(level.description);
        return res.json(level);
    }
    catch (error) {
        console.error("Error retrieving level:", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}));
export default router;
