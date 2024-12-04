import prisma from "@/utils/db";

export default async function getFilteredArticles(searchParams, itemsPerPage) {
    //getting the inputs
    const { text, author, sort, sortMode, tags, page } = searchParams;

    //limit max offset
    const offset = itemsPerPage * (page - 1);
    if (offset > 10000)
        throw new Error("Searching this deep in not permitted");

    //creating filter objects
    const textFilter = text && {
        OR: [
            {
                title: {
                    contains: text,
                    mode: 'insensitive'
                }
            },
            {
                description: {
                    contains: text,
                    mode: 'insensitive'
                }
            }
        ]
    };
    const authorFilter = author && {
        userId: author
    };
    const tagFilter = tags && tags.length > 0 && {
        tags: {
            hasEvery: tags,
        }
    };

    //fetch
    return (await prisma.article.findMany({
        where: {
            AND: [
                { ...textFilter },
                { ...authorFilter },
                { ...tagFilter }
            ]
        },
        include:
        {
            user: {
                select: {
                    name: true,
                    image: true,
                    id: true,
                    description: true
                }
            }
        },
        orderBy: [
            { [sort]: sortMode },
            { id: "desc" }
        ],
        skip: offset,
        take: itemsPerPage
    }));
}