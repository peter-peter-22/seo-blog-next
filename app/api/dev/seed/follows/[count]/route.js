import prisma from "@/utils/db";

export async function GET(_, { params }) {
    if (process.env.NODE_ENV !== "development")
        return;

    const { count } = params;

    const users = await prisma.user.findMany();
    let allFollows=[];

    for (let n = 0; n < users.length; n++) {
        const follows = Array.from({ length: count }, () => ({
            followerId: users[n].id,
            followedId: users[Math.floor(Math.random() * users.length)].id,
        }));
        allFollows = [...allFollows, ...follows];
    }

    await prisma.follows.createMany({
        data: allFollows,
        skipDuplicates:true
    })

    return new Response("follows added");
}