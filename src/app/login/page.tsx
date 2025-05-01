"use client"
import Link from "next/link"
import React from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function SignupPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    })

    const onLogin = async () => {
        // Handle signup logic
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-gray-900 px-4">
            <div className="bg-zinc-100 p-8 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-zinc-800 mb-6">Create Account</h1>
                <hr className="mb-6 border-t border-zinc-300" />

                <div className="flex flex-col gap-4">
    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-zinc-700">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Enter your email"
                            className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
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
                            className="mt-1 w-full px-4 py-2 border border-zinc-300 rounded-lg bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                        />
                    </div>

                    <button
                        onClick={onLogin}
                        className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition duration-300"
                    >
                        Log In
                    </button>

                    <p className="text-center text-sm text-zinc-600 mt-4">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-indigo-600 hover:underline font-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
