'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from "@/utils/db";

const FormSchema = z.object({
    content: z.array(z.object({})),
    //title: z.string({
    //    invalid_type_error: 'Please select a customer.',
    //}),
});

export async function publishArticle(data) {
    console.log(data);

    // Validate form fields using Zod
    const validatedFields = FormSchema.safeParse({
        content: data
    });

    // If form validation fails, return errors early. Otherwise, continue.
    console.log(validatedFields.error);
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    await prisma.task.create({
        data: {
            content: "test"
        }
    });

    console.log("ok");
}