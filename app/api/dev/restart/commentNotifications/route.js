import prisma from "@/utils/db";

export async function GET()
{
    await prisma.$executeRaw`CALL restart_comment_notifications();`;
    return new Response("comment notifications recalculated");
}