import prisma from "@/utils/db";
import { baseUrl } from "@/app/lib/serverInfo";
import { logSitemaps } from "@/app/lib/serverInfo";

const itemsPerSitemap = 50000;

export default async function sitemap({ id }) {
    if (logSitemaps)
        console.log(`article sitemap ${id} is generated`);

    const articles = await prisma.article.findMany({
        where: rangeFilter(id),
        select: {
            id: true,
            updatedAt: true
        }
    });

    return articles.map(article => ({
        url: `${baseUrl}/articles/${article.id}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: "daily",
        priority: 0.8
    }))
}

export async function generateSitemaps() {
    if (logSitemaps)
        console.log("article sitemaps are counted");

    const itemCount = await prisma.article.count();
    const sitemapCount = Math.ceil(itemCount / itemsPerSitemap);
    return Array.from({ length: sitemapCount }, (_, i) => ({ id: i }));
}

export async function generateArticleSitemaps() {
    if (logSitemaps)
        console.log("article index sitemap is generated");

    //get all sitemap ids
    const itemCount = await prisma.article.count();
    const sitemapCount = Math.ceil(itemCount / itemsPerSitemap);
    const sitemapIds = Array.from({ length: sitemapCount }, (_, id) => id);

    //calculate their data
    const promises = sitemapIds.map(generateChunk);
    const sitemaps = await Promise.all(promises);

    return sitemaps;
}

async function generateChunk(id) {
    //calculate the newest update within this chunk
    const { updatedAt } = await prisma.article.findFirst({
        where: rangeFilter(id),
        orderBy: { updatedAt: "desc" },
        select: {
            updatedAt: true
        }
    });

    return {
        url: getChunkUrl(id),
        lastModified: updatedAt,
    }
}

function getChunkUrl(id) {
    return `${baseUrl}/sitemaps/articles/sitemap/${id}.xml`;
}

function rangeFilter(id) {
    return {
        AND: [
            { numberId: { gte: itemsPerSitemap * id } },
            { numberId: { lt: itemsPerSitemap * (parseInt(id) + 1) } }
        ]
    }
}

export const revalidate = 3600;