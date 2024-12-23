import prisma from "@/utils/db";
import { baseUrl } from "@/app/lib/serverInfo";

const itemsPerSitemap = 50000;

export default async function sitemap({ id }) {
    console.log(`user sitemap ${id} is generated`);

    const users = await prisma.user.findMany({
        where: rangeFilter(id),
        select: {
            id: true,
            updatedAt: true
        }
    });

    return users.map(user => ({
        url: `${baseUrl}/authors/${user.id}`,
        lastModified: new Date(user.updatedAt),
    }))
}

export async function generateSitemaps() {
    console.log("user sitemaps are counted");

    const itemCount = await prisma.user.count();
    const sitemapCount = Math.ceil(itemCount / itemsPerSitemap);
    return Array.from({ length: sitemapCount }, (_, i) => ({ id: i }));
}

export async function generateUserSitemaps() {
    console.log("user index sitemap is generated");

    //get all sitemap ids
    const itemCount = await prisma.user.count();
    const sitemapCount = Math.ceil(itemCount / itemsPerSitemap);
    const sitemapIds = Array.from({ length: sitemapCount }, (_, id) => id);

    //calculate their data
    const promises = sitemapIds.map(generateChunk);
    const sitemaps = await Promise.all(promises);

    return sitemaps;
}

async function generateChunk(id) {
    //calculate the newest update within this chunk
    const { updatedAt } = await prisma.user.findFirst({
        where: rangeFilter(id),
        orderBy: { updatedAt: "desc" },
        select: {
            updatedAt: true
        }
    });

    return {
        url: getChunkUrl(id),
        lastModified: updatedAt,
        changeFrequency: "monthly"
    }
}

function getChunkUrl(id) {
    return `${baseUrl}/sitemaps/users/sitemap/${id}.xml`;
}

function rangeFilter(id) {
    return {
        AND: [
            { numberId: { gte: itemsPerSitemap * id } },
            { numberId: { lt: itemsPerSitemap * (parseInt(id) + 1) } }
        ]
    }
}
