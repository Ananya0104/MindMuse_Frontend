"use client"

import React from "react"

import { useState } from "react"
import { useAuthRedirect } from "../../hooks/useAuthRedirect"
import { useRouter } from "next/navigation"
import LoginWelcome from "../../app/login/LoginWelcome"
import LoginForm from "../../app/login/LoginForm"
import LoginFooter from "../../app/login/LoginFooter"
import { UI_LABELS } from "../../constants/general"
import { APP_ROUTES } from "../../constants/navigation"

import type { ApiError, AuthResponse } from "../../interfaces/auth"
import { apiCall } from "../../lib/api"
import { HTTP_METHODS } from "../../constants/api"
import { handleAuthResponse } from "../../lib/emergency_utils"

export default function LoginPage() {
  const router = useRouter()
  const isLoadingAuth = useAuthRedirect(APP_ROUTES.JOURNAL.ROOT, undefined, true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email.trim()) {
      setError("Email is required")
      return
    }

    if (!formData.password.trim()) {
      setError("Password is required")
      return
    }

    try {
      setLoading(true)
      setError("")
      setSuccess("Logging in...")

      const authRequest = {
        authType: "email",
        credentials: {
          email: formData.email,
          password: formData.password,
        },
      }

      const response: AuthResponse = await apiCall(APP_ROUTES.AUTH.LOGIN, HTTP_METHODS.POST, authRequest)
      console.log("response", response)
      if (response.success && response.tokens) {
        await handleAuthResponse(response, router, setSuccess)
      } else {
        throw new Error(response.message || "Unknown error during login")
      }
    } catch (err) {
      const error = err as ApiError
      setError(`Login failed: ${error.message}`)
      console.log("No token found")
    } finally {
      setLoading(false)
    }
  }

  if (isLoadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-700 text-lg">{UI_LABELS.LOADING} Checking authentication...</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full">
      {/* Left Section: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <LoginWelcome />
          <LoginForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
          />
          <LoginFooter />
        </div>
      </div>

      {/* Right Section: Image Background */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: 'url("/mindmuse-back.png")' }}
      ></div>
    </div>
  )
}
