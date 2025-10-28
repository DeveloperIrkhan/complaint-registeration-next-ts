import nodemailer from 'nodemailer'

interface ISendMail {
    body?: string;
    emailType?: string;
    userEmail: string;
    userTrackingId: string;
}

export const sendEmailAsync = async ({ body, emailType, userEmail, userTrackingId }: ISendMail) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "",
            port: 334,
            secure: true,
            auth: {
                user: "",
                pass: ""
            },
        })


        const mailOption = {
            from: "",
            to: userEmail,
            subject: emailType === "Tracking" ? "PRCS Complaint Tracking Email" : "PRCS IT Section",
            html: body || `click on following link to track your Complaint<b>${process.env.NEXT_APP_URL}/complaint-tracking/${userTrackingId}</b>`
        }

        const mailResponse = await transporter.sendMail(mailOption)
        return mailResponse
    }
    catch (error: any) {
        console.log("error while sending email" + error);
        throw new Error(error.message);
    }
}