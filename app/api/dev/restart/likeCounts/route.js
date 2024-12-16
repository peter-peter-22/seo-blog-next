import prisma from "@/utils/db";

export async function GET()
{
    await prisma.$executeRaw`CALL restart_like_counts();`;
    return new Response("like counts recalculated");
}