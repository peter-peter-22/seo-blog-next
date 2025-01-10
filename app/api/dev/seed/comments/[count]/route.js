import prisma from "@/utils/db";
import { faker } from '@faker-js/faker';

export async function GET(_, { params }) {
    if (process.env.NODE_ENV !== "development")
        return new Response("development only");;

    const { count } = await params;

    const users = await prisma.user.findMany();
    const articles = await prisma.article.findMany();

    let allComments = [];
    for (let n = 0; n < users.length; n++) {
        const comments = Array.from({ length: count }, () => ({
            userId: users[n].id,
            articleId: articles[Math.floor(Math.random() * articles.length)].id,
            text: faker.lorem.sentences(3)
        }));
        allComments = [...allComments, ...comments];
    }

    await prisma.comment.createMany({
        data: allComments,
        skipDuplicates: true,
    })

    return new Response("comments added");
}

export const dynamic = "force-dynamic";
