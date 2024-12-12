import prisma from "@/utils/db";
import { faker } from '@faker-js/faker';

const tags = ["technology", "coding", "tutorial", "html", "css", "javascript", "react", "nextjs", "cars", "web-development", "politics", "sports", "postgres", "prisma", "ai"];

function randomTag() {
    return tags[Math.floor(Math.random() * tags.length)];
}

function randomTags() {
    const min = 3;
    const max = 10;
    return Array.from({ length: Math.floor(Math.random(max - min)) + min }, randomTag)
}

export async function GET(_, { params }) {
    if (process.env.NODE_ENV !== "development")
        return;

    const { count } = params;

    const users = await prisma.user.findMany();

    const articles = Array.from({ length: count }, () => ({
        userId: users[Math.floor(Math.random() * users.length)].id,
        title: faker.lorem.words({ min: 1, max: 5 }),
        description: faker.lorem.sentences({ min: 1, max: 3 }),
        tags: randomTags(),
        content: [{ "type": "paragraph", "children": [{ "text": faker.lorem.paragraphs() }] }]
    }));

    await prisma.article.createMany({
        data: articles,
    })

    return new Response("articles added");
}