<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Edward V Hotel</title>
    <link href="https://fonts.googleapis.com/css2?family=Finlandica:ital@1&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Finlandica', sans-serif; background-color: #2e2626;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td style="padding: 20px 0 30px 0;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 2px solid gold; background-color: #2e2626;">
                    <tr>
                        <td style="text-align: center; padding: 20px;">
                            <img src="https://media.discordapp.net/attachments/1075531082298032151/1097196966028513310/Logo.png?width=300&height=150" alt="Edward's Hotel Logo" style="display: block; margin: auto;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 40px; font-size: 18px; line-height: 1.5em; text-align: center;">
                            <p style="margin-bottom: 30px; color:whitesmoke">Dear valued guest,</p>
                            <p style="margin-bottom: 30px;color:whitesmoke">A successful reservation has been made in your name. The reservation date is as follows</p>
                            <p style="color:whitesmoke"></p>
                            <p style="margin-bottom: 30px; background-color: #222f80; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 10px;">Date from: {{ $mailData['datefrm'] }} <br>Date to: {{ $mailData['dateto'] }} <br>
                            Reservation ID: {{ $mailData['id'] }}</p>
                            <p style="color:whitesmoke">Thank you for choosing Edward V Hotel.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; font-size: 14px; text-align: center;">
                            <p style="color:whitesmoke ;margin-bottom: 10px;">Edward V Hotel</p>
                            <p style="color:whitesmoke; margin-bottom: 10px;">Maameltain Seaside Road</p>
                            <p style="color:whitesmoke; margin-bottom: 10px;">Maameltain Jounieh, Lebanon</p>
                            <!-- <p><a href="#" style="color: #666; text-decoration: none;">Unsubscribe</a></p> -->
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
