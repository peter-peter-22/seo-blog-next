import prisma from "@/utils/db";
import { faker } from '@faker-js/faker';

export async function GET() {
    if (process.env.NODE_ENV !== "development")
        return;

    const users = Array.from({ length: 50 }, () => ({
        name: faker.person.fullName(),
        image: faker.image.avatar(),
        email: faker.internet.email(),
        description: faker.lorem.sentence()
    }));

    await prisma.user.createMany({
        data: users,
        skipDuplicates: true,
    })

    return new Response("users added");
}