import { baseUrl } from "@/app/lib/serverInfo";

const updatedAt = new Date("2024-12-23");

const urls = [
    "",
]

export default function sitemap() {
    return urls.map(url => ({
        url: `${baseUrl}/${url}`,
        lastModified: updatedAt
    }))
}

export function generalSitemap() {
    return {
        url: `${baseUrl}/sitemaps/general/sitemap.xml`,
        lastModified: updatedAt
    }
}