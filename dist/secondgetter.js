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
import * as cheerio from "cheerio";
import { fileURLToPath } from "url";
const url = "http://backrooms-wiki.wikidot.com/phenomena";
function fetchAndParse(url, filter, output) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            const body = yield response.text();
            const $ = cheerio.load(body);
            const linksData = [];
            console.log(filter);
            console.log(body);
            $(`a[href*="${filter}-"]`).each((i, el) => {
                const href = `http://backrooms-wiki.wikidot.com${$(el).attr("href")}`;
                const text = $(el).text().trim();
                const title = $(el).parent().text().trim();
                linksData.push({ href, text, title });
            });
            const __dirname = path.dirname(fileURLToPath(import.meta.url));
            const outputPath = path.join(__dirname, output).replace("dist", "cache");
            console.log(outputPath);
            fs.writeFileSync(outputPath, JSON.stringify(linksData, null, 2));
            console.log("Links data saved");
        }
        catch (error) {
            console.error("Error fetching or parsing data:", error);
        }
    });
}
fetchAndParse(url, "/phenomenon", "phenomena_links.json");
