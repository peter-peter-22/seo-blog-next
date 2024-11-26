import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_EMAIL_PASSWORD
    }
});

export async function sendCompanyEmail(options) {
    const mailOptions = {
        from: `Textmine <${transporter.options.auth.user}>`,
        ...options
    };
    await sendMailAsync(mailOptions);
}

async function sendMailAsync(mailOptions) {
    return console.log(mailOptions);
    return new Promise(resolve => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                throw error;
            }
            resolve();
        });
    });
}

