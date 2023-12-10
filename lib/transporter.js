import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "ssl0.ovh.net",
    port: 465,
    secure: true,
    auth: {
        user: "noreply@delmoo.fr",
        pass: ",G|%!e{f^;m`]-Y27$VU"
    }
});

export default transporter;
