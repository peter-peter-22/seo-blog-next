export function getEnvBool(name) {
    return process.env[name] === "true";
}

function getUrl() {
    return process.env.NODE_ENV === "production" ?
        process.env.BASE_URL
        : "http://localhost:3000"
}

export const baseUrl = getUrl();
export const logCaching = getEnvBool("DEBUG_CACHE")
export const logSitemaps = getEnvBool("DEBUG_SITEMAPS")