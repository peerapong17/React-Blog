import nodemailer from "nodemailer"

const sendEmail = async (email, subject, text, link) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: subject,
      text: text,
      html: `<a href="${link}"> Click here </a> to reset your password`,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
    throw new Error(
      "Something went wrong, Could not send reset-password-link to your email"
    );
  }
};

export default sendEmail;
