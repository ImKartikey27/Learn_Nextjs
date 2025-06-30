// domain.com/verifytoken/assassasdgfgfgf. this is better for server component
// domain.com/verifytoken?token=assassasdgfgfgf.   this is better for client component

import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"

export const sendEmail = async({email, emailType , userID}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userID.toString(),10 )

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userID, 
            {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            },
        )
        }
        else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userID, 
            {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            },
        )
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "0039352dc2810d",
            pass: "dc5f93fc75a675"
        }
        })

        const mailOptions = {
            from: "kartikey.sangal.11.a.sdpsmzn@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
        
    } catch (error:any) {
        console.log(error.message);
        throw error
    }
}