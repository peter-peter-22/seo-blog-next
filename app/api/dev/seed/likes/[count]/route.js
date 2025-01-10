import prisma from "@/utils/db";
import { GET as restartLikeCounts } from "../../../restart/likeCounts/route";

export async function GET(_, { params }) {
    if (process.env.NODE_ENV !== "development")
        return new Response("development only");;

    const { count } = await params;

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

    await prisma.$executeRaw`ALTER TABLE "VerifiedLike" DISABLE TRIGGER ALL;`;
    await prisma.verifiedLike.createMany({
        data: allLikes,
        skipDuplicates: true,
    })
    await prisma.$executeRaw`ALTER TABLE "VerifiedLike" ENABLE TRIGGER ALL;`;
    await restartLikeCounts();

    return new Response("likes added");
}

export const dynamic = "force-dynamic";
