"use server";

import prisma from "@/utils/db";
import { UpdateProfileSchema } from "@/app/ui/forms/schemas/ProfileSchema";
import authOrThrow from "../auth/authOrThrow";

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