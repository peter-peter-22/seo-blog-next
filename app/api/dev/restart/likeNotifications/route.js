import prisma from "@/utils/db";

export async function GET()
{
    await prisma.$executeRaw`CALL restart_like_notifications();`;
    return new Response("like notifications recalculated");
}