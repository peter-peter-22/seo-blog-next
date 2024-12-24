import fs from "fs";

const loaded = loadAll();

function loadAll() {
    const loaded = {};
    const topicsPath = `${process.cwd()}/app/lib/emails/topics`;
    const files = fs.readdirSync(topicsPath);
    files.forEach(fileName => {
        const htmlFile = fs.readFileSync(`${topicsPath}/${fileName}`, "utf-8");
        const textPlacehodler = createTextPlaceholder(htmlFile);
        const myObject = { html: htmlFile, text: textPlacehodler };
        const withoutHtml = fileName.split(".")[0];
        loaded[withoutHtml] = myObject;
    });
    return loaded;
}

function createTextPlaceholder(htmlFile) {
    //replace link tags with their href
    let text = htmlFile.replaceAll(/<a[\S\s]+?(?=href)href="([^"]+)"[\S\s]+?(?=<\/a>)<\/a>/g, "$1");
    //remove other html tags
    text = text.replaceAll(/<[^>]+>/g, "");
    //replace stacked linebreaks
    text = text.replaceAll(/[\r\n]+/g, "\n");
    //remove stacked spaces
    text = text.replaceAll(/ {2,}/g, "");
    return text;
}

export function getTopic(name) {
    const found = loaded[name];
    if (!found)
        throw new Error(`invalid email topic name "${name}"`);
    return found;
}