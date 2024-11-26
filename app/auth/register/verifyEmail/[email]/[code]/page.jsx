import prisma from "@/utils/db";
import { redirect } from "next/navigation";

export default async function Page(props) {
    const params = await props.params;
    const email = decodeURIComponent(params.email);
    const code = decodeURIComponent(params.code);

    const registrationSession = (await prisma.emailVerifications.findMany({
        where: {
            email,
            code
        }
    }))[0];

    const exists = !!registrationSession;
    //const isExpired=registrationSession.updatedAt;
    const isExpired = false;
    const isCorrect = exists && !isExpired;


    if (isCorrect) {
        const { username: name, password, email } = registrationSession;
        await prisma.user.upsert({
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
        });
    }

    return (
        isCorrect ? (
            "success"
        ) : (
            isExpired ? (
                "expired"
            ) : (
                "incorrect code or email"
            )
        )
    );
}