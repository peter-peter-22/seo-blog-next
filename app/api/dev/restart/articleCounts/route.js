import prisma from "@/utils/db";

export async function GET()
{
    await prisma.$executeRaw`CALL restart_article_counts();`;
    return new Response("article counts recalculated");
}

export const dynamic = "force-dynamic";
