import { buildSendMail } from "mailing-core"
import nodemailer from "nodemailer"

export const sendMail = buildSendMail({
    transport: nodemailer.createTransport({
        host: "smtp.postmarkapp.com",
        port: 587,
        auth: {
            user: process.env.POSTMARK_API_KEY,
            pass: process.env.POSTMARK_API_KEY,
        },
        pool: true,
    }),
    defaultFrom: "David from Pixelfy <pixelfy@pixelfy.ai>",
    configPath: "./mailing.config.json",
})

export const asyncSendMail = async ({ component, to, subject }) => {
    return sendMail({ component, to, subject })
}

export const sendMarketingMail = buildSendMail({
    transport: nodemailer.createTransport({
        host: "smtp-broadcasts.postmarkapp.com",
        port: 587,
        auth: {
            user: process.env.POSTMARK_MARKETING_API_KEY,
            pass: process.env.POSTMARK_MARKETING_API_SECRET,
        },
        pool: true,
    }),
    defaultFrom: "David from Pixelfy <pixelfy@pixelfy.ai>",
    configPath: "./mailing.config.json",
})

export default sendMail
