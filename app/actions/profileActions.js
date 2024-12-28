"use server";

import prisma from "@/utils/db";
import { ChangePasswordSchema, UpdateProfileSchema } from "@/app/ui/forms/schemas/ProfileSchema";
import authOrThrow from '@/app/(pages)/auth/authOrThrow';
import { bcryptSalt } from "@/app/(pages)/auth/authSettings";
import bcrypt from 'bcrypt';
import { handleErrors } from "@/app/lib/handleErrors";

export async function updateProfileAction(values) {
    try {
        values = UpdateProfileSchema.parse(values);
        const { id, name, description, image } = values;

        const session = await authOrThrow();
        if (session.user.id !== id)
            throw new Error("This is not your profile");

        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                name,
                description,
                image
            },
            select: {
                name: true,
                image: true
            }
        });

        return { updatedUser };
    }
    catch (err) {
        return { error: err.toString() };
    }
}

export async function changePasswordAction(data) {
    return await handleErrors(async () => {
        ChangePasswordSchema.parse(data);
        const { password } = data;

        const session = await authOrThrow();
        const id = session.user.id;

        await prisma.user.update({
            where: {
                id
            },
            data: {
                password: bcrypt.hashSync(password, bcryptSalt)
            }
        })
    })
}