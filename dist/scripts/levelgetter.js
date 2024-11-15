var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as cheerio from "cheerio";
import fs from "fs";
function getLevels(html) {
    const cat = cheerio.load(html);
    // console.log(`html = ${html}`);
    const levelsContainer = cat("body").find(".yui-content")[1];
    const levels = cat(levelsContainer);
    const levelsArray = [];
    levels.find("div").each((index, element) => {
        cat(element)
            .find("a")
            .each((index, element) => {
            const link = cat(element);
            const text = link.text().trim();
            const href = `http://backrooms-wiki.wikidot.com${link.attr("href")}`;
            const title = link
                .parent()
                .contents()
                .filter(function () {
                return this.type === "text" && cat(this).text().trim() !== text;
            })
                .text()
                .trim();
            const response = {
                text,
                href,
                title,
            };
            levelsArray.push(response);
        });
    });
    return levelsArray;
}
function levels() {
    return __awaiter(this, void 0, void 0, function* () {
        const html_dom = yield fetch("http://backrooms-wiki.wikidot.com/normal-levels-i");
        const html = yield html_dom.text();
        const levels = getLevels(html);
        fs.writeFile("/cache/cache.json", JSON.stringify(levels), (err) => {
            if (err) {
                console.log("Error writing to file:", err);
            }
            else {
                console.log("File written successfully");
            }
        });
    });
}
levels();
