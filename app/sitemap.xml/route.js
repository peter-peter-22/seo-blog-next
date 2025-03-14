import { generateArticleSitemaps } from "../sitemaps/articles/sitemap";
import { generalSitemap } from "../sitemaps/general/sitemap";
import { logSitemaps } from "@/app/lib/serverInfo";
import { generateUserSitemaps } from "../sitemaps/users/sitemap";

export async function GET() {
    const sitemaps = (await Promise.all([
        generalSitemap(),
        generateArticleSitemaps(),
        generateUserSitemaps(),
    ])).flat()

    const sitemapXML = buildSitemapIndex(sitemaps);

    return new Response(sitemapXML, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}

// Function to construct the XML structure of the sitemap index.
function buildSitemapIndex(sitemaps) {
    if (logSitemaps)
        console.log("sitemap index is generated");

    // XML declaration and opening tag for the sitemap index.
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    // Iterate over each sitemap URL and add it to the sitemap index.
    sitemaps.forEach(sitemap => {
        xml += "<sitemap>";
        xml += `<loc>${sitemap.url}</loc>`; // Location tag specifying the URL of a sitemap file.
        xml += `<lastmod>${sitemap.lastModified.toISOString()}</lastmod>`
        xml += "</sitemap>";
    });

    // Closing tag for the sitemap index.
    xml += "</sitemapindex>";
    return xml;
}

export const revalidate = 3600;