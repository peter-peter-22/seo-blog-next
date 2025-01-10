import prisma from "@/utils/db";

export async function GET() {
    await prisma.$executeRaw`CALL restart_follow_notifications();`;
    return new Response("follow notifications recalculated");
}

export const dynamic = "force-dynamic";
