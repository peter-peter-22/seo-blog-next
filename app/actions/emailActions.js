"use server";

import { RegisterSchema } from "../ui/forms/schemas/AuthSchema";
import { sendCompanyEmail } from "@/app/lib/emails/sendEmail";
import { createEmail } from "@/app/lib/emails/createHtmlEmail";
import { baseUrl } from "@/app/lib/serverInfo";
import prisma from "@/utils/db";

export async function crendentialsRegisterAction(credentials) {
    try {
        const parsedCredentials = RegisterSchema.parse(credentials);
        const { username, password, email } = parsedCredentials;

        const { code } = await prisma.emailVerifications.upsert({
            where: {
                email
            },
            create: {
                username,
                password,
                email
            },
            update: {
                username,
                password,
            },
            select: {
                code: true
            }
        });

        const query = new URLSearchParams({
            redirect: "redirect",
        });
        console.log(query.toString());

        const body = createEmail("verifyEmail", { url: `${baseUrl}/auth/register/verifyEmail/${email}/${code}` });
        await sendCompanyEmail({
            to: "gfdifgjiugfdjiudfgjjiu@gmail.com",
            subject: "Email verification",
            ...body
        });
    }
    catch (err) {
        console.error(err);
        return err.toString();
    }
}

export async function test() {
    try {
        const emailHtml = createEmail("verifyEmail", { url: baseUrl, });
        console.log(emailHtml);
    }
    catch (err) {
        console.error(err);
    }
}