import prisma from "@/utils/db";

export default async function getFilteredUsers(searchParams) {
    const itemsPerPage = 24;

    //getting the inputs
    const { text, page } = searchParams;

    //limit max offset
    const offset = itemsPerPage * (page - 1);
    if (offset > 1000)
        throw new Error("Searching this deep in not permitted");

    //get rows
    //if no text provided, return unfiltered rows
    const { users, count } = text ? await filtered({ itemsPerPage, offset, text }) : await unfiltered({ itemsPerPage, offset });

    //calculate page count
    const pages = Math.ceil(count / itemsPerPage);

    return { page, pages, users, count };
}

//get all users with some ordering
async function unfiltered({ itemsPerPage, offset }) {
    const [users, count] = await Promise.all([
        prisma.user.findMany({
            orderBy: [
                { followerCount: "desc" },
                { id: "asc" }
            ],
            take: itemsPerPage,
            skip: offset
        }),
        prisma.user.count()
    ]);
    return { users, count };
}

//get the filtered rows and order them by relevance and popularity
async function filtered({ itemsPerPage, offset, text }) {
    const [users, [{ count }]] = await Promise.all([
        //users
        prisma.$queryRaw`  
        SELECT 
            id,
            name,
            description,
            "articleCount",
            "createdAt",
            image,
                ts_rank(search, websearch_to_tsquery('english', ${text}))
                + log("articleCount"+1)*0.01
                + log("followerCount"+1)*0.01
                as rank
        FROM "User"
        WHERE search @@ websearch_to_tsquery('english',${text})
        ORDER BY rank DESC, "createdAt" DESC, id DESC
        OFFSET ${offset}
        LIMIT ${itemsPerPage};`,

        //count
        prisma.$queryRaw`
        SELECT COUNT(*)::INT from "User"
        WHERE search @@ websearch_to_tsquery('english',${text})`
    ])

    console.log(offset, itemsPerPage,count,users)
    return { users, count };
}