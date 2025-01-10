import { getEnvBool } from "@/utils/envBool";

function getUrl() {
    return process.env.NODE_ENV === "production" ?
        process.env.BASE_URL
        : "http://localhost:3000"
}

export const baseUrl = getUrl();
export const logCaching=getEnvBool("LOG_CACHING")