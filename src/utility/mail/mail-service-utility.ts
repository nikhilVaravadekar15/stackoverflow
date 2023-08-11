export function getUserOnboardingCodeTemplate(username: string) {
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
    style="width: 50%; font-size: large;">
    <div style="margin-top: 2px; margin-bottom: 2px;">
        Hi <span style="font-weight: 600; color: rgb(35, 35, 35);">${username}</span>,
    </div>
    <div style="margin-top: 2px; margin-bottom: 2px;">
        Welcome to <span style="font-weight: 600; cursor: pointer; color: rgb(251, 146, 60);">Stack Overflow</span>
        - we're excited to have you on board and we'd love to say thank you on behalf
        of our whole team for chosing us. We believe our product will help you in your coding journey.
    </div>
    <div style="margin-top: 2px; margin-bottom: 2px;">
        To ensure you gain the very best out of our product, we've put together some of the most helpful guides:
        Our <span style="cursor: pointer; color: rgb(8, 105, 223);">FAQ</span> is a great place to find the answers
        to common questions you might have as a new user. The <span
            style="cursor: pointer; color: rgb(8, 105, 223);">knowledge base</span>
        has the answers to all of your tech related questions. Our
        <span style="cursor: pointer; color: rgb(8, 105, 223);">blog</span>
        has some great tips and best practices on how you can use and benefit from.
    </div>
    <div style="display: flex; flex-direction: column; margin-top: 14px;">
        Regards,
        <span style="font-weight: 600; cursor: pointer; color: rgb(251, 146, 60);">
            Stack-Overflow team
        </span>
    </div>
</body>

</html>

    `
}

export function getUserWelcomingBackCodeTemplate(username: string) {
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
    
    <body style="width: 80%; font-size: large;">
        <div style="margin-top: 2px; margin-bottom: 4px;">
            Dear <span style="font-weight: 600; color: rgb(35, 35, 35);">${username}</span>,
        </div>
        <div style="margin-top: 2px; margin-bottom: 4px;">
            We're thrilled to see you back at
            <span style="font-weight: 600; cursor: pointer; color: rgb(251, 146, 60);">Stack Overflow</span>!
            Your presence is a reminder of the wonderful community we've built together.
            As you log in once more, we want to express our gratitude for your continued support and engagement.
        </div>
        <div style="margin-top: 2px; margin-bottom: 4px;">
            Your enthusiasm and contribution are invaluable to us.
            Our team has been hard at work to provide you with an even better experience.
            Here's what you can expect during your visit:
        </div>
        <div style="margin-top: 6px; margin-bottom: 6px;">
            <div>
                <span style="cursor: pointer; color: rgb(8, 105, 223);">Stay Updated:</span>
                Discover the latest updates, features, and improvements we've introduced since your last visit. We're
                constantly evolving to make your time on stack-overflow more enjoyable.
            </div>
            <div>
                <span style="cursor: pointer; color: rgb(8, 105, 223);">Personalized Content:</span>
                Based on your previous interactions, we've tailored content that we believe will resonate with you. Dive
                right into what matters most to you.
            </div>
            <div>
                <span style="cursor: pointer; color: rgb(8, 105, 223);">Engage and Connect:</span>
                Our community is thriving, and we invite you to be a part of the discussions, share your thoughts, and
                connect with fellow users who share your interests.
            </div>
            <div>
                <span style="cursor: pointer; color: rgb(8, 105, 223);">Enhanced Security:</span>
                Your privacy and security are our top priorities. Rest assured, your information is protected by
                state-of-the-art measures.
            </div>
        </div>
        <div style="margin-top: 2px; margin-bottom: 4px;">
            Thank you for choosing Stack-Overflow, as your online destination.
            We're here to make your journey exceptional, every step of the way.
            If you have any questions, suggestions, or just want to say hello,
            don't hesitate to reach out. We're more than happy to assist you.
        </div>
        <div style="margin-top: 2px; margin-bottom: 4px;">
            Once again, welcome back!
            We're looking forward to another fantastic experience with you.
        </div>
        <div style="margin-top: 2px; margin-bottom: 2px;">
            P.S. If you have any friends who might enjoy Stack-Overflow,
            feel free to spread the word.
            Together, we create an amazing community!****
        </div>
        <div style="display: flex; flex-direction: column; margin-top: 14px;">
            Regards,
            <span style="font-weight: 600; cursor: pointer; color: rgb(251, 146, 60);">
                Stack-Overflow team
            </span>
        </div>
    </body>
    
    </html>    
   `
}
