"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

    const onSignup = async () => {
        // Handle signup logic
        try {

            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            // console.log("Signup success", response.data);
            toast.success("Signup successful")
            router.push("/login")
            
        } catch (error:any) {

            console.log("signup failed", error.message);
            toast.error(error.message)
            
        }finally{
            setLoading(false)
        }

    }

    useEffect(() => {
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }

    },[user])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-gray-900 px-4">
            <div className="bg-zinc-100 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-zinc-800 mb-6">Create Account</h1>
                <hr className="mb-6 border-t border-zinc-300" />

                <div className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-zinc-700">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="Enter your username"
                            className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter your email"
                            className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-zinc-700">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Enter your password"
                            className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-black"
                        />
                    </div>

                    <button
                        onClick={onSignup}
                        disabled= {buttonDisabled}
                        className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition duration-300"
                    >
                        {buttonDisabled ? "Enter Details" : "SignUP"}
                    </button>

                    <p className="text-center text-sm text-zinc-600 mt-4">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-600 hover:underline font-medium">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
