"use client"

import  React from "react"
import SignupWelcome from "../../app/signup/SignupWelcome";
import SignupForm from "../../app/signup/SignupForm";
import SignupFooter from "../../app/signup/SignupFooter";
import { useState} from "react";
import { useRouter } from "next/navigation";

import {
  apiCall
} from "../../lib/api"

import {
  ApiError,
  AuthResponse
} from "../../interfaces/auth"

import {
  CountryCode
} from "../../interfaces/user"
import { useAuthRedirect } from "../../hooks/useAuthRedirect";
import { APP_ROUTES } from "../../constants/navigation";
import { UI_LABELS } from "../../constants/general";
import { handleAuthResponse } from "../../lib/emergency_utils";


export default function SignupPage() {
  const router = useRouter()
  const isLoadingAuth = useAuthRedirect(APP_ROUTES.DASHBOARD);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [countryCodes] = useState<CountryCode[]>([
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
  ]);


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+91",
    phoneNumber: "",
    password: "",
    dob: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.fullName.trim()) {
      setError("Full name is required")
      return
    }

    if (!formData.email.trim()) {
      setError("Email is required")
      return
    }

    if (!formData.phoneNumber.trim()) {
      setError("Phone number is required")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    // Check for at least one symbol
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/
    if (!symbolRegex.test(formData.password)) {
      setError("Password must contain at least 1 symbol")
      return
    }

    // Age validation
    function getAge(date: Date) {
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const m = today.getMonth() - date.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
        age--;
      }
      return age;
    }

    if (!formData.dob || getAge(new Date(formData.dob)) < 18) {
      setError("You must be at least 18 years old to sign up.");
      return;
    }

    // Format DOB from yyyy-mm-dd to dd-mm-yyyy
    function formatDOB(isoDate: string | Date): string {
      if (!isoDate) return "";
      if (typeof isoDate === "string") {
        const [year, month, day] = isoDate.split("-");
        return `${day}/${month}/${year}`;
      }
      const d = isoDate as Date;
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }

    try {
      setLoading(true)
      setError("")

      const authRequest = {
        authType: "email",
        credentials: {
          email: formData.email,
          password: formData.password,
          name: formData.fullName,
          phone: formData.phoneNumber,
          countryCode: formData.countryCode,
          dob: formatDOB(formData.dob),
        },
      }

      const response: AuthResponse = await apiCall("/api/auth/register", "POST", authRequest)

      if (response.success && response.tokens) {
        setSuccess("Account created successfully! 🎉")
        await handleAuthResponse(response, router, setSuccess);
      }
    } catch (err) {
      const error = err as ApiError
      setError(`Signup failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }
  // If the auth check is still loading, show a loading message or spinner
  if (isLoadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{UI_LABELS.LOADING} Checking authentication...</p>
      </div>
    );
  }
  return (
    <div className="flex h-screen w-full">
      {/* Left Section: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <SignupWelcome />
          <SignupForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
            countryCodes={countryCodes}
          />
          <SignupFooter />
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
