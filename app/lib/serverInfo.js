function getUrl() {
    return process.env.NODE_ENV === "production" ?
        `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : process.env.DEV_URL
}

export const baseUrl = getUrl();