const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
require('dotenv').config();
const path = require('path');

const sendEmail = async (email, subject, templateData) => {
    
    try {
        const templateFile = fs.readFileSync(path.resolve(__dirname, 'verifyEmail.hbs'), 'utf8');
        const template = handlebars.compile(templateFile);
        const html = template(templateData);

        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.SMTP_USERNAME, 
                pass: process.env.SMTP_PASSWORD 
            }
        });

        console.log(`My user name is ${process.env.SMTP_USERNAME}`); 

        await transporter.sendMail({
            from: process.env.SMTP_USERNAME, 
            to: email,
            subject: subject,
            html: html,
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.log(error);
        console.log("Email not sent");
    }
};

module.exports = sendEmail;
