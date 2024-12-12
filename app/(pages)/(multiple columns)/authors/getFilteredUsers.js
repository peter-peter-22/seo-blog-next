import prisma from "@/utils/db";

export default async function getFilteredUsers(searchParams) {
    const itemsPerPage = 24;

    //getting the inputs
    const { text, sort, sortMode, page } = searchParams;

    //limit max offset
    const offset = itemsPerPage * (page - 1);
    if (offset > 10000)
        throw new Error("Searching this deep in not permitted");

    //get rows
    const users = await prisma.$queryRaw`  
        SELECT id,name,description,"articleCount",
            ts_rank(search, websearch_to_tsquery('english', ${text}))
            + log("articleCount"+1)*0.01
            + log("followerCount"+1)*0.01
            as rank
        FROM "User"
        WHERE search @@ websearch_to_tsquery('english',${text})
        ORDER BY rank DESC LIMIT 10;
    `;
    console.log(users);

    //calculate page count
    const count = users.length;
    const pages = Math.ceil(count / itemsPerPage);

    return { page, pages, users, count };
}