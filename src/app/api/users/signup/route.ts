import {connect} from "@/dbconfig/dbConfig"
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        //write the validations
        console.log(reqBody);

        const user = await User.findOne({email})
        if(user){
            console.log("User already exists");
            return NextResponse.json({error: "User Already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10) 
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        console.log("Saved User" , savedUser);
        //fire up verification email

        await sendEmail({email, emailType: "VERIFY", userID: savedUser._id})
        
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}