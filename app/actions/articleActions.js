'use server';

import { PublishArticleSchema, UpdateArticleSchema } from "@/app/ui/forms/schemas/ArticleSchema";
import prisma from "@/utils/db";
import { redirect } from 'next/navigation';
import authOrThrow from '../auth/authOrThrow';

export async function publishOrUpdateArticle(data, updating) {
    let redirectUrl;
    try {
        const session = await authOrThrow();

        // Validate form fields using Zod
        const Schema = updating ? UpdateArticleSchema : PublishArticleSchema;
        Schema.parse(data);

        const created = await createOrUpdate(data, session, updating);

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
        try {
            return await prisma.article.update({
                where: {
                    id,
                    userId: session.user.id
                },
                data: values
            });
        }
        catch (err) {
            throw new Error(err.meta?.cause ?? err)
        }
    }
    else {
        return await prisma.article.create({
            data: values
        });
    }
}