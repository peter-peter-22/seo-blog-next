import { baseUrl } from "./lib/serverInfo";

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: "/profile",
            disallow: "/authors$",
            disallow: "/browse"
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}