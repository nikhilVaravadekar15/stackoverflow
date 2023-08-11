/* eslint-disable import/no-anonymous-default-export */
import {
    getUserOnboardingCodeTemplate,
    getUserWelcomingBackCodeTemplate
} from '@/utility/mail/mail-service-utility';
import { SES } from 'aws-sdk';
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

    async sendOnboardingMail(receiver: User) {
        try {
            var params: SES.Types.SendEmailRequest = {
                Destination: {
                    ToAddresses: [
                        receiver.email!,
                    ]
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: getUserOnboardingCodeTemplate(receiver.name!),
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
            console.log(`Onboarding email successfully sent to ${receiver.email} with message id ${emailSent.MessageId}}`)
        } catch (error: any) {
            console.log(error)
        }

    }

    async sendWelcomingBackMail(receiver: User) {
        try {
            var params: SES.Types.SendEmailRequest = {
                Destination: {
                    ToAddresses: [
                        receiver.email!,
                    ]
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: "UTF-8",
                            Data: getUserWelcomingBackCodeTemplate(receiver.name!),
                        }
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: "Welcome back Stack Overflow"
                    }
                },
                Source: process.env.AWS_SES_SENDER_EMAIL!,
            };
            // send email
            const emailSent = await this.aws_ses.sendEmail(params).promise()
            console.log(`Welcome back email successfully sent to ${receiver.email} with message id ${emailSent.MessageId}}`)
        } catch (error: any) {
            console.log(error)
        }

    }

}

export default new MailService();
