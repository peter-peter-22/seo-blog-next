export default function getTagLink(tag) {
    const searchParams = new URLSearchParams({ tags: tag });
    return `/browse?${searchParams}`
}