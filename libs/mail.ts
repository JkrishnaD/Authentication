import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "jayak5063@gmail.com",
    subject: "Two Factor Authentication Code",
    html: `<p>${token}</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "jayak5063@gmail.com",
    subject: "Email Confirmation",
    html: `<p>Click <strong><a href="${confirmLink}">Here</a></strong>! to confrim the email</p>`,
  });
};

export const sendResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "jayak5063@gmail.com",
    subject: "Password Reset",
    html: `<p> Click <strong><a href="${resetLink}">Here</a></strong> To change Password</p>`,
  });
};
