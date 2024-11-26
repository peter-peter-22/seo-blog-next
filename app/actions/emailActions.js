"use server";

import { RegisterSchema } from "../ui/forms/schemas/AuthSchema";
import { sendCompanyEmail } from "@/app/lib/emails/sendEmail";
import { createEmail } from "@/app/lib/emails/createHtmlEmail";
import { baseUrl } from "@/app/lib/serverInfo";

export async function crendentialsRegisterAction(credentials) {
    try {
        const parsedCredentials = RegisterSchema.parse(credentials);
        const { username, password } = parsedCredentials;

        const body = createEmail("verifyEmail", { url: baseUrl, });
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

export async function test() {
    try {
        const emailHtml = createEmail("verifyEmail", { url: baseUrl, });
        console.log(emailHtml);
    }
    catch (err) {
        console.error(err);
    }
}