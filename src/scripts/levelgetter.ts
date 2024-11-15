import * as cheerio from "cheerio";
import fs from "fs";

function getLevels(html: string) {
  const cat = cheerio.load(html);
  // console.log(`html = ${html}`);

  const levelsContainer = cat("body").find(".yui-content")[1];
  const levels = cat(levelsContainer);
  const levelsArray: any = [];

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

async function levels() {
  const html_dom = await fetch(
    "http://backrooms-wiki.wikidot.com/normal-levels-i"
  );
  const html = await html_dom.text();
  const levels = getLevels(html);
  fs.writeFile("/cache/cache.json", JSON.stringify(levels), (err) => {
    if (err) {
      console.log("Error writing to file:", err);
    } else {
      console.log("File written successfully");
    }
  });
}
levels();
