import prettify from "html-prettify";

export function prettifyAndClean(html) {
  const prettified = prettify(html);

  return prettified.replace(/['"]?\/n['"]?/g, "");
}
