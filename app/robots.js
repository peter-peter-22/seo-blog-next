import { baseUrl } from "./lib/serverInfo";

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                "/profile",
                "/authors$",
                "/browse"
            ],
        },
        sitemap: `${baseUrl}/sitemaps/sitemap-2.xml`,
    };
}