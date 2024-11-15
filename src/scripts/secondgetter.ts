import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import { fileURLToPath } from "url";

const url = "http://backrooms-wiki.wikidot.com/phenomena";

async function fetchAndParse(url, filter, output) {
  try {
    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);

    const linksData: any = [];
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
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

fetchAndParse(url, "/phenomenon", "phenomena_links.json");
