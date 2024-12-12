import prisma from "@/utils/db";

export async function GET(_, { params }) {
    if (process.env.NODE_ENV !== "development")
        return;

    const { count } = params;

    const users = await prisma.user.findMany();
    const articles = await prisma.article.findMany();

    let allLikes = [];
    for (let n = 0; n < users.length; n++) {
        const likes = Array.from({ length: count }, () => ({
            userId: users[n].id,
            articleId: articles[Math.floor(Math.random() * articles.length)].id,
            isDislike: Math.random() < 0.3
        }));
        allLikes = [...allLikes, ...likes];
    }

    await prisma.verifiedLike.createMany({
        data: allLikes,
        skipDuplicates: true,
    })

    return new Response("likes added");
}