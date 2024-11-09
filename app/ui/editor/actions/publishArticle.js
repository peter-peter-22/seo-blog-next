'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from "@/utils/db";

const FormSchema = z.object({
    article: z.array(z.object({})),
    title: z.string(),
    desc: z.string()
    //title: z.string({
    //    invalid_type_error: 'Please select a customer.',
    //}),
});

export async function publishArticle(data) {
    // Validate form fields using Zod
    console.log(data);
    const validatedFields = FormSchema.safeParse(data);

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
            desc: data.desc,
            content: data.article
        }
    });
}