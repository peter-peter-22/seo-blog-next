import prisma from "@/utils/db";

export default async function getFilteredArticles(searchParams) {
    const itemsPerPage = 12;

    //getting the inputs
    const { text, author, sort, sortMode, tags, page } = searchParams;

    //limit max offset
    const offset = itemsPerPage * (page - 1);
    if (offset > 10000)
        throw new Error("Searching this deep in not permitted");

    //create the filter that will be used in the article selector and counter
    const where = {
        AND: [
            {
                //text filter
                ...text && {
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
                }
            },
            {
                //author filter
                ...author && {
                    userId: author
                }
            },
            {
                //tag filter
                ...tags && tags.length > 0 && {
                    tags: {
                        hasEvery: tags,
                    }
                }
            }
        ]
    }

    //fetch
    const [articles, count] = await Promise.all([
        prisma.article.findMany({
            where,
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
        }),
        prisma.article.count({
            where
        }),
    ]);

    //calculate page count
    const pages = Math.ceil(count / itemsPerPage);

    return { page, pages, articles, count };
}