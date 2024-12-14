"use server";

import { RegisterSchema } from "../ui/forms/schemas/AuthSchema";
import { sendCompanyEmail } from "@/app/lib/emails/sendEmail";
import { createEmail } from "@/app/lib/emails/createHtmlEmail";
import { baseUrl } from "@/app/lib/serverInfo";
import prisma from "@/utils/db";
import bcrypt from 'bcrypt';
import { bcryptSalt } from "@/app/(pages)/(single column)/auth/authSettings";

export async function crendentialsRegisterAction(credentials, callbackUrl) {
    try {
        const parsedCredentials = RegisterSchema.parse(credentials);
        let { username, password, email } = parsedCredentials;
        if (!callbackUrl || typeof (callbackUrl) != String)
            callbackUrl = "/profile";
        password = bcrypt.hashSync(password, bcryptSalt);

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
                password
            },
            select: {
                code: true
            }
        });

        const body = createEmail("verifyEmail", { url: `${baseUrl}/auth/register/verifyEmail/${email}/${code}/${encodeURIComponent(callbackUrl)}` });
        await sendCompanyEmail({
            to: "gfdifgjiugfdjiudfgjjiu@gmail.com",
            subject: "Email verification",
            ...body
        });
    }
    catch (err) {
        return err.toString();
    }
}