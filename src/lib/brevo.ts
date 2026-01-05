import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "9f56e5001@smtp-brevo.com",
    pass: "6GcNaQDRIF5Tg4Ez",
  },
});
