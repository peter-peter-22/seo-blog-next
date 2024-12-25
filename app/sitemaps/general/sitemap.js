import { baseUrl } from "@/app/lib/serverInfo";
import { logSitemaps } from "../sitemapConstants";

const updatedAt = new Date("2024-12-23");

const urls = [
    [""],
    ["privacyPolicy"],
    ["termsOfService"],
    ["editorTutorial"],
    ["searchTutorial"],
    ["auth/forgtPassword"],
    ["auth/signIn"],
]

export default function sitemap() {
    if (logSitemaps)
        console.log("general sitemap generated");

    return urls.map(([url, priority]) => ({
        url: `${baseUrl}/${url}`,
        lastModified: updatedAt,
        changeFrequency: "monthly",
        priority: priority ?? 1
    }))
}

export function generalSitemap() {
    return {
        url: `${baseUrl}/sitemaps/general/sitemap.xml`,
        lastModified: updatedAt,
    }
}

export const revalidate = 3600;