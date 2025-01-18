import env from "../env.js";

import nodemailer from "nodemailer"

export async function orderMail(firstName, email) {
	const transporter = nodemailer.createTransport({
		host: env.SEND_IN_BLUE_HOST,
		port: env.SEND_IN_BLUE_PORT,
		auth: {
			user: env.SEND_IN_BLUE_USER,
			pass: env.SEND_IN_BLUE_PASSWORD,
		},
	});

	const mailOptions = {
		from: "suhaimanwar.official@gmail.com",
		to: email,
		subject: 'Enquiry!',
		text: `Dear,
		New enquiry from ${firstName}

        Email: ${email}

         

        Greetings and thank you`,
	};

	await transporter.sendMail(mailOptions);
}