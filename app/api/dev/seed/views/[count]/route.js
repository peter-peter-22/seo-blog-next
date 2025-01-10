import prisma from "@/utils/db";
import { GET as restartViewCounts } from "@/app/api/dev/restart/viewCounts/route";

export async function GET(_, { params }) {
    if (process.env.NODE_ENV !== "development")
        return new Response("development only");;

    const { count } = await params;

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

    await prisma.$executeRaw`ALTER TABLE "VerifiedView" DISABLE TRIGGER ALL;`;
    await prisma.verifiedView.createMany({
        data: allViews,
        skipDuplicates: true,
    })
    await prisma.$executeRaw`ALTER TABLE "VerifiedView" ENABLE TRIGGER ALL;`;
    await restartViewCounts();

    return new Response("views added");
}

export const dynamic = "force-dynamic";
