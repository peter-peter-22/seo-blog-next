'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from "@/utils/db";
import { PublishArticleSchema } from "@/app/ui/forms/schemas/ArticleSchema";

export async function publishArticle(data) {
    // Validate form fields using Zod
    const validatedFields = PublishArticleSchema.safeParse(data);

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        console.log(validatedFields.error);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    await prisma.article.create({
        data: {
            title: data.title,
            desc: data.description,
            content: data.article
        }
    });
}