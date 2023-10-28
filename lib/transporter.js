import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "99e177cde0e721",
        pass: "68fed8e1c97369"
    }
});

export default transporter;