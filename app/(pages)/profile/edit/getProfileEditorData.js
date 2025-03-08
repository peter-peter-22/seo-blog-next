"use server"

import { handleErrors } from "@/app/lib/handleErrors";
import { auth } from "@/auth";
import prisma from "@/utils/db";

export default async function getProfileEditorData() {
    return await handleErrors(async () => {
        const session = await auth();
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                name: true,
                image: true,
                description: true
            }
        });
        return { user }
    })
}