import prisma from "@/utils/db";
import { baseUrl } from "@/app/lib/serverInfo";

export default async function sitemap() {
    console.log("browser sitemap is generated");

    //calculate the newest update within this chunk
    const tags = await prisma.topic.findMany({
        orderBy: { count: "desc" },
        select: {
            name: true
        },
        take: 100
    });

    return tags.map(tag => ({
        url: `${baseUrl}/browse?${new URLSearchParams({ tag: tag.name }).toString()}`,
        lastModified: new Date(),
        changeFreq: "daily"
    }))
}

export function browserSitemap() {
    return {
        url: `${baseUrl}/sitemaps/browser/sitemap.xml`,
        lastModified: new Date(),
        changeFrequency: "daily"
    }
}