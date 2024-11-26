import { fillTemplate } from "./getTemplate";
import { getTopic } from "./loadTopics";
import Mustache from "mustache";

export function createEmail(topic, values) {
    let { text, html } = getTopic(topic);
    html = Mustache.render(html, values);
    html = fillTemplate(html);
    text = Mustache.render(text, values);
    return { text, html };
}