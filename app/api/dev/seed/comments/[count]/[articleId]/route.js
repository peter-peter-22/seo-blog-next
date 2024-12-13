import prisma from "@/utils/db";
import { faker } from '@faker-js/faker';

export async function GET(_, { params }) {
    if (process.env.NODE_ENV !== "development")
        return;

    const { count, articleId } = params;

    const users = await prisma.user.findMany();
    const article = await prisma.article.findUnique({ where: { id: articleId } });

    const comments = Array.from({ length: count }, () => ({
        userId: users[Math.floor(Math.random() * users.length)].id,
        articleId: article.id,
        text: faker.lorem.sentences(3)
    }));

    await prisma.comment.createMany({
        data: comments,
        skipDuplicates: true,
    })

    return new Response("comments added to article");
}