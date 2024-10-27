import nodemailer from 'nodemailer';
import { env } from './env.js';
import { EMAIL } from '../constants/email.js';

const transport = nodemailer.createTransport({
  host: env(EMAIL.SMTP_HOST),
  port: Number(env(EMAIL.SMTP_PORT)),
  auth: {
    user: env(EMAIL.SMTP_USER),
    pass: env(EMAIL.SMTP_PASSWORD),
  },
});

export const sendEmail = async (option) => await transport.sendMail(option);
