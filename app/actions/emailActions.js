"use server";

import { sendCompanyEmail } from "@/app/lib/resend/sendEmail";

export async function crendentialsRegisterAction() {
    try {
        //const parsedCredentials = RegisterSchema.parse(credentials);
        //const { username, password } = parsedCredentials;

        await sendCompanyEmail("gfdifgjiugfdjiudfgjjiu@gmail.com", "subject", "text");
    }
    catch (err) {
        console.log(err);
        return err.toString();
    }
}