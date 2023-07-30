/* eslint-disable import/no-anonymous-default-export */
import { SES } from 'aws-sdk';
import nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { User } from '@prisma/client';

class MailService {
    private aws_ses: SES

    constructor() {
        const awsConfig: SES.Types.ClientConfiguration = {
            region: process.env.AWS_SES_REGION!,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,

        }

        this.aws_ses = new SES(awsConfig)
    }

    async sendMail(user: User) {
        try {
            // Create sendEmail params 
            var params: SES.Types.SendEmailRequest = {
                Destination: {
                    ToAddresses: [
                        user.email!,
                    ]
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: getUserOnboardingCodeTemplate(user.name!),
                        }
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: "Welcome to Stack Overflow"
                    }
                },
                Source: process.env.AWS_SES_SENDER_EMAIL!,
            };
            // send email
            const emailSent = await this.aws_ses.sendEmail(params).promise()
            console.log(`Email sent successfully to ${user.email} with message id ${emailSent.MessageId}}`)
        } catch (error: any) {
            console.log(error)
        }

    }

}

function getUserOnboardingCodeTemplate(username: string) {
    return `
    <!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <title>Stack Overflow</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico?v=ec617d715196"
            type="image/x-icon">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css">
        <style type="text/css">
            @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);
        </style>
        <style type="text/css">
            * {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
        </style>
    </head>
    
    <body
        style="width: 50%; display: flex; align-items: center; justify-content: center; word-spacing:normal; background-color:#fafbfc;">
        <div
            style="padding: 4px; font-size: large; background:#ffffff; background-color:#ffffff; margin:0px auto; display: flex; flex-direction: column; gap: 8px;">
            <div>
                Hi <span style="font-weight: 600; color: rgb(35, 35, 35);">${username}</span>,
            </div>
            <div>
                Welcome to <span style="font-weight: 600; cursor: pointer; color: rgb(251, 146, 60);">Stack Overflow</span>
                - we're excited to have you on board and we'd love to say thank you on behalf
                of our whole team for chosing us. We believe our product will help you in your coding journey.
            </div>
            <div>
                To ensure you gain the very best out of our product, we've put together some of the most helpful guides:
                Our <span style="cursor: pointer; color: rgb(8, 105, 223);">FAQ</span> is a great place to find the answers
                to common questions you might have as a new user. The <span
                    style="cursor: pointer; color: rgb(8, 105, 223);">knowledge base</span>
                has the answers to all of your tech related questions. Our
                <span style="cursor: pointer; color: rgb(8, 105, 223);">blog</span>
                has some great tips and best practices on how you can use and benefit from.
            </div>
            <div style="display: flex; flex-direction: column; margin-top: 16px;">
                Regards,
                <span style="font-weight: 600; cursor: pointer; color: rgb(251, 146, 60);">
                    Stack-Overflow team
                </span>
            </div>
        </div>
    </body>
    
    </html>
    
    `
}

export default new MailService();
