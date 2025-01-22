import prisma from "@/utils/db";
import { VerifyPage } from "./VerifyPage";

export default async function Page(props) {
    const params = await props.params;
    const email = decodeURIComponent(params.email);
    const code = decodeURIComponent(params.code);
    const redirect = decodeURIComponent(params.callbackUrl);

    const firstSignIn = "/profile/newUser";
    const callbackUrl = encodeURIComponent(`${firstSignIn}?callbackUrl=${encodeURIComponent(redirect)}`);

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
        finalize(registrationSession);
    }

    return (
        <VerifyPage {...{ callbackUrl, isCorrect, isExpired }} />
    );
}

function finalize(registrationSession) {
    const { username: name, password, email, code } = registrationSession;
    Promise.allSettled([
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
    ]).catch(err => { console.error("error while finalizind registration session", err) })
}

function olderThanMinutes(date, minutes) {
    const time = minutes * 60 * 1000;
    const currentTime = Date.now(); // Current time in milliseconds
    const inputTime = date.getTime(); // Time of the Date object in milliseconds

    return (currentTime - inputTime) > time;
}