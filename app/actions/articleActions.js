'use server';

import { PublishArticleSchema } from "@/app/ui/forms/schemas/ArticleSchema";
import prisma from "@/utils/db";
import { redirect } from 'next/navigation';
import authOrThrow from '../auth/authOrThrow';

export async function publishArticle(data) {
    let redirectUrl;
    try {
        const session = await authOrThrow();

        // Validate form fields using Zod
        PublishArticleSchema.parse(data);

        const created = await createOrUpdate(data, session);

        redirectUrl = `/articles/${created.id}`;
    }
    catch (err) {
        return err.toString();
    }
    if (redirectUrl)
        redirect(redirectUrl);
}

async function createOrUpdate(data, session) {
    const { title, description, content, id, tags } = data;
    console.log(id);
    const values = {
        title,
        description,
        content,
        userId: session.user.id,
        tags
    }
    if (id) {
        return await prisma.article.update({
            where: {
                id
            },
            data: values
        });
    }
    else {
        return await prisma.article.create({
            data: values
        });
    }
}