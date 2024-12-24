import { fillTemplate } from "./getTemplate";
import { getTopic } from "./loadTopics";
import Mustache from "mustache";
import { baseUrl } from "../serverInfo";

export function createEmail(topic, values) {
    let { text, html } = getTopic(topic);
    html = Mustache.render(html, values);
    html = fillTemplate(html);
    text = Mustache.render(text, values);
    const attachments = [{
        filename: 'icon.jpg',
        path: `${baseUrl}/icon.jpg`,
        cid: 'unique@logo'
    }]

    return { text, html, attachments };
}