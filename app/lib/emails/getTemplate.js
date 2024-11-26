import fs from "fs";
import Mustache from "mustache";

const template = loadTemplate();

function loadTemplate() {
    const templatePath = "app/lib/emails/templateEmail.html";
    return fs.readFileSync(templatePath, "utf-8");
}

function fillTemplate(content) {
    return Mustache.render(template, { content });
}

export { fillTemplate };