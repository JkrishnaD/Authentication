import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "jayak5063@gmail.com",
    subject: "Email Confirmation",
    html: `<p>Click <strong><a href="${confirmLink}">Here</a></strong>! to confrim the email</p>`,
  });
};
