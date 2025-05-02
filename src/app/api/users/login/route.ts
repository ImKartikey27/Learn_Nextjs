import {connect} from "@/dbconfig/dbConfig"
import User from "@/models/userModel.js"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest){
    try {
        
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500} )
    }
}