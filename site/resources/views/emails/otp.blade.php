<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Edward V Hotel</title>
    <link href="https://fonts.googleapis.com/css2?family=Finlandica:ital@1&display=swap" rel="stylesheet">

    <style type="text/css">
		.otp-container {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 10px;
			font-size: 20px;
			font-weight: bold;
			text-align: center;
			color: black;
			background-color: #473E3E;
			border-radius: 10px;
			padding: 20px;
			box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
		}

		.otp-digit {
			justify-content: center;
			align-items: center;
			height: 30px;
			width: 30px;
			margin-right: 10px;
			background-color: #F7F7F7;
			border-radius: 10px;
			box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
		}

		.otp-hyphen {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 20px;
			width: 10px;
			margin-right: 10px;
			font-size: 20px;
			font-weight: bold;
			color: #F7F7F7;
		}
	</style>


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
                            <p style="margin-bottom: 30px;color:whitesmoke">An attempt was just made to login into your account. If this was not you, please ignore this email immediately.</p>
                            <p style="color:whitesmoke">Otherwise, here is your One Time Password to login into your account. This code will expire in 5 minutes.</p>
                            <div class="otp-container">
                                <div class="otp-digit">{{$mailData['first']}}</div>
                                <div class="otp-digit">{{$mailData['second']}}</div>
                                <div class="otp-digit">{{$mailData['third']}}</div>
                                <div class="otp-hyphen">-</div>
                                <div class="otp-digit">{{$mailData['fourth']}}</div>
                                <div class="otp-digit">{{$mailData['fifth']}}</div>
                                <div class="otp-digit">{{$mailData['sixth']}}</div>
                            </div>
                            <p style="color:whitesmoke">Thank you for choosing Edward V Hotel. We hope to see you again soon!</p>
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
