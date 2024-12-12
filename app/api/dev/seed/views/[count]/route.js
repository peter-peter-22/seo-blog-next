import prisma from "@/utils/db";

export async function GET(_, { params }) {
    if (process.env.NODE_ENV !== "development")
        return;

    const { count } = params;

    const users = await prisma.user.findMany();
    const articles = await prisma.article.findMany();

    let allViews = [];
    for (let n = 0; n < users.length; n++) {
        const views = Array.from({ length: count }, () => ({
            userId: users[n].id,
            articleId: articles[Math.floor(Math.random() * articles.length)].id
        }));
        allViews = [...allViews, ...views];
    }

    await prisma.verifiedView.createMany({
        data: allViews,
        skipDuplicates: true,
    })

    return new Response("views added");
}