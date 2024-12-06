import prisma from "@/utils/db";

export default async function getFilteredUsers(searchParams) {
    const itemsPerPage = 24;

    //getting the inputs
    const { text, sort, sortMode, page } = searchParams;

    //limit max offset
    const offset = itemsPerPage * (page - 1);
    if (offset > 10000)
        throw new Error("Searching this deep in not permitted");

    //creating filter objects
    const textFilter = text && {
        name: {
            contains: text,
            mode: 'insensitive'
        }
    };
    //const tagFilter = tags && tags.length > 0 && {
    //    tags: {
    //        hasEvery: tags,
    //    }
    //};
    const where = {
        AND: [
            { ...textFilter },
        ]
    }

    //fetch
    const [users, count] = await Promise.all([
        prisma.user.findMany({
            where,
            orderBy: [
                { [sort]: sortMode },
                { id: "desc" }
            ],
            select: {
                name: true,
                id: true,
                description: true,
                image: true
            },
            skip: offset,
            take: itemsPerPage
        }),
        prisma.user.count({
            where
        }),
    ]);

    //calculate page count
    const pages = Math.ceil(count / itemsPerPage);

    return { page, pages, users, count };
}