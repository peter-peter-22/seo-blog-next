import prisma from "@/utils/db";
import { faker } from '@faker-js/faker';

export async function GET(_, { params }) {
    if (process.env.NODE_ENV !== "development")
        return new Response("development only");;

    const { count } = await params;

    const users = Array.from({ length: count }, () => ({
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

export const dynamic = "force-dynamic";
