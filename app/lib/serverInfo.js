function getUrl() {
    return process.env.NODE_ENV === "production" ?
        `https://${process.env.BASE_URL}`
        : "http://localhost:3000"
}

export const baseUrl = getUrl();