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

        const created = await prisma.article.create({
            data: {
                title: data.title,
                desc: data.description,
                content: data.article,
                authorID: session.user.id
            }
        });
        redirectUrl = `/articles/${created.id}`;
    }
    catch (err) {
        return err.toString();
    }
    if (redirectUrl)
        redirect(redirectUrl);
}