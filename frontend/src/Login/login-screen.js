"use client"

import { useState } from "react"
import Image from "next/image"
import { Mail, Lock } from "lucide-react"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showError, setShowError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate validation - in a real app, you'd call an API
    if (email && password) {
      // Handle successful login
      console.log("Login attempt with:", { email, password })
    } else {
      setShowError(true)
    }
  }

  return (
    <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Illustration */}
        <div className="w-full md:w-1/2 bg-white p-8 relative">
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />

          <div className="flex justify-center items-center h-full">
            <div className="relative w-full max-w-md">
              {/* Login illustration with phone, lock and figures */}
              <div className="relative h-[400px]">
                {/* Phone */}
                <div className="w-40 h-64 bg-indigo-800 rounded-xl transform rotate-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg">
                  <div className="w-full h-4 bg-indigo-900 rounded-t-xl flex items-center justify-start pl-2 space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Red bar */}
                <div className="w-48 h-8 bg-red-500 rounded-md transform -rotate-12 absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 shadow-md">
                  <div className="w-full h-full flex items-center justify-end pr-2 space-x-1">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Lock */}
                <div className="w-24 h-28 absolute bottom-20 left-20">
                  <div className="w-full h-16 bg-yellow-400 rounded-md relative">
                    <div className="w-4 h-6 bg-gray-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-sm">
                      <div className="w-1 h-1 bg-black absolute bottom-1 left-1/2 transform -translate-x-1/2 rounded-full"></div>
                    </div>
                  </div>
                  <div className="w-10 h-10 border-8 border-yellow-400 rounded-full absolute -top-6 left-1/2 transform -translate-x-1/2"></div>
                </div>

                {/* People */}
                <div className="absolute bottom-10 right-20">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    alt="People looking at phone"
                    width={120}
                    height={120}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-50" />
        </div>

        {/* Right side - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="max-w-md mx-auto mt-8">
            <h2 className="text-xl font-medium text-gray-800 mb-8">Login into your account</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email ID :
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="info@privatetechnologies.com"
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md pr-10"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setShowError(false)
                    }}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md pr-10"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setShowError(false)
                    }}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                {showError && <span className="text-sm text-red-500">Invalid username or password</span>}
                <a href="#" className="text-sm text-blue-600 hover:underline ml-auto">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition-colors"
              >
                Login now
              </button>

              <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
              </div>

              <button
                type="button"
                className="w-full border border-indigo-800 text-indigo-800 py-2 px-4 rounded-md hover:bg-indigo-50 transition-colors"
              >
                Signup now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
