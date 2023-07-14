/* eslint-disable import/no-anonymous-default-export */
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { getVerificationCodeTemplate } from '@/utility/nodemailer/mail-template';

class OtpService {
    private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

    constructor() {
        const config = {
            host: process.env.AWS_SES_REGION!,
            port: parseInt(process.env.NODEMAILER_PORT!),
            secure: process.env.NODEMAILER_SECURE === "false" ? false : true, // upgrade later with STARTTLS
            auth: {
                user: process.env.NODEMAILER_USER!,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        }

        // create reusable transporter object using the default SMTP transport
        this.transporter = nodemailer.createTransport(config);
    }

    generateOtp(): number {
        const otp: number = crypto.randomInt(100000, 999999)
        return otp;
    }

    async sendMail(email: string, verificationCode: number) {
        await this.transporter.sendMail({
            from: '"Stack Overflwo Team 👋" <no-reply@stackoverflow.com>', // sender address
            to: email, // list of receivers
            subject: "Stack OVerflow | verification code", // Subject line
            html: getVerificationCodeTemplate(email, verificationCode), // html body
        });
    }

}

export default new OtpService();
