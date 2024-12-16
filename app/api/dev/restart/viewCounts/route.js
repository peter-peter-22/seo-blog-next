import prisma from "@/utils/db";

export async function GET()
{
    await prisma.$executeRaw`CALL restart_view_counts();`;
    return new Response("view counts recalculated");
}