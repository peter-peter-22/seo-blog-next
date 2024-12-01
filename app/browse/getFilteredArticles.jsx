import prisma from "@/utils/db";

export default async function getFilteredArticles() {
    //getting inputs
    const text = "";
    const author = "cm3yvmeco000avj9vukm4do18";
    const sort = "createdAt";
    const sortMode = "asc";
    const tags = ["tag1"];

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
            hasSome: tags,
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
                    image: true
                }
            }
        },
        orderBy: [
            {
                [sort]: sortMode
            }
        ],
    }));
}