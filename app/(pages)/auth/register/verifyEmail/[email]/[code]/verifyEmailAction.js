"use server"

import { handleErrors } from "@/app/lib/handleErrors";
import getProfileLink from "@/app/ui/components/users/getProfileLink";
import prisma from "@/utils/db";

export default async function verifyEmailAction(params) {
    return await handleErrors(async () => {
        const email = decodeURIComponent(params.email);
        const code = decodeURIComponent(params.code);
        const redirect = decodeURIComponent(params.callbackUrl);

        const registrationSession = await prisma.emailVerifications.findUnique({
            where: {
                email,
                code
            }
        });

        const exists = !!registrationSession;
        const isExpired = exists ? olderThanMinutes(registrationSession.updatedAt, 5) : false;
        const isCorrect = exists && !isExpired;

        if (isCorrect) {
            //upsert user and delete the registration session
            const user = await finalize(registrationSession);

            const firstSignIn = "/profile/newUser";
            const callbackUrl = encodeURIComponent(`${firstSignIn}?callbackUrl=${encodeURIComponent(redirect||getProfileLink(user))}`);

            return { callbackUrl, isCorrect, isExpired }
        }

        return { isCorrect, isExpired }
    })
}

async function finalize(registrationSession) {
    const { username: name, password, email, code } = registrationSession;
    const [user] = await Promise.all([
        //upsert user
        prisma.user.upsert({
            where: { email },
            create: {
                email,
                name,
                password
            },
            update: {
                name,
                password
            }
        }),
        //delete registration session
        prisma.emailVerifications.deleteMany({
            where: {
                email,
                code
            }
        })
    ])
    return user
}

function olderThanMinutes(date, minutes) {
    const time = minutes * 60 * 1000;
    const currentTime = Date.now(); // Current time in milliseconds
    const inputTime = date.getTime(); // Time of the Date object in milliseconds

    return (currentTime - inputTime) > time;
}