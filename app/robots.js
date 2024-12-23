import { baseUrl } from "./lib/serverInfo";

export default function robots() {
    return {
        rules: {
            userAgent: '*',
            disallow: '/',
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}