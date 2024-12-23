import { baseUrl } from "@/app/lib/serverInfo";

const updatedAt = new Date("2024-12-23");

const urls = [
    ["",1],
]

export default function sitemap() {
    return urls.map(([url,priority]) => ({
        url: `${baseUrl}/${url}`,
        lastModified: updatedAt,
        changeFrequency: "monthly",
        priority
    }))
}

export function generalSitemap() {
    return {
        url: `${baseUrl}/sitemaps/general/sitemap.xml`,
        lastModified: updatedAt,
    }
}