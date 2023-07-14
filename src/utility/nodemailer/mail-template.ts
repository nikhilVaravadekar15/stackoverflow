export function getVerificationCodeTemplate(email: string, verificationCode: number) {
    return `
        <!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
                <title>Codershouse</title>
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style type="text/css">
                    #outlook a {
                        padding: 0;
                    }

                    body {
                        margin: 0;
                        padding: 0;
                        -webkit-text-size-adjust: 100%;
                        -ms-text-size-adjust: 100%;
                    }

                    table,
                    td {
                        border-collapse: collapse;
                    }

                    img {
                        border: 0;
                        height: auto;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                        -ms-interpolation-mode: bicubic;
                    }

                    p {
                        display: block;
                        margin: 13px 0;
                    }

                </style>

                <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css">
                <style type="text/css">
                    @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);

                </style>
                <style type="text/css">
                    @media only screen and (min-width:480px) {
                        .mj-column-per-100 {
                            width: 100% !important;
                            max-width: 100%;
                        }
                    }

                </style>
                <style media="screen and (min-width:480px)">
                    .moz-text-html .mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%;
                    }

                </style>
                <style type="text/css">
                    @media only screen and (max-width:480px) {
                        table.mj-full-width-mobile {
                            width: 100% !important;
                        }

                        td.mj-full-width-mobile {
                            width: auto !important;
                        }
                    }

                </style>
            </head>

            <body style="display: flex; justify-content: center; word-spacing:normal; background-color:#fafbfc;">
                <div style="width: fit-content; background-color:#fafbfc;">
                    <div style="background:#ffffff; background-color:#ffffff; margin:0px auto;">
                        <div
                            style="text-align: center; font-size: xx-large; font-weight: 700; margin-top: 40px; margin-bottom: 20px;">
                            Codershouse</div>
                        <table cellpadding="0" cellspacing="0" role="presentation"
                            style="background:#ffffff;background-color:#ffffff;width:100%;">
                            <tbody>
                                <tr>
                                    <td
                                        style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                                        <div class="mj-column-per-100 mj-outlook-group-fix"
                                            style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                                            <table cellpadding="0" cellspacing="0" role="presentation"
                                                style="vertical-align:middle;" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td
                                                            style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;text-align: center;">
                                                            <div
                                                                style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#000000;">
                                                                <span>Hello, ${email}</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;text-align: center;">
                                                            <div
                                                                style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#000000;">
                                                                Please use the verification code below on the
                                                                <a href="#" target="_blank"
                                                                    style="text-decoration: none; font-weight: 600;">Codershouse</a>
                                                                website:
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style="font-size:0px;padding:10px 25px;word-break:break-word;text-align: center;">
                                                            <div
                                                                style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:24px;font-weight:bold;line-height:1;text-align:center;color:#000000;">
                                                                ${verificationCode}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style="font-size:0px;padding:10px 25px;padding-right:16px;padding-left:25px;word-break:break-word;text-align: center;">
                                                            <div
                                                                style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#000000;">
                                                                If you didn't request this, you can ignore this email or let us
                                                                know.</div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td
                                                            style="font-size:0px;padding:10px 25px;padding-right:25px;padding-left:25px;word-break:break-word;text-align: center;">
                                                            <div
                                                                style="font-family:open Sans Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:center;color:#000000;">
                                                                Thanks! <br />Codershouse team</div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </body>
        </html>
    `
}
