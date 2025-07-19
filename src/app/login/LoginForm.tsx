"use client"
import React from "react"

interface LoginFormProps {
  formData: { email: string; password: string }
  setFormData: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>
  handleSubmit: (e: React.FormEvent) => void
  loading: boolean
  error: string
  success: string
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  error,
  success,
}) => {
  const [showPassword] = React.useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="mt-4 p-3 bg-black/10 border border-black text-black rounded-md">{error}</div>}
      {success && <div className="mt-4 p-3 bg-black/10 border border-black text-black rounded-md">{success}</div>}
      <label className="block text-black text-md mb-2" htmlFor="email">Email Address</label>
      <input
        id="email"
        type="email"
        placeholder=""
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
        className="w-full mb-4 px-4 py-3 bg-transparent border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder-black text-black"
        required
      />
      <label className="block text-black text-md mb-2" htmlFor="password">Password</label>
      <input
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder=""
        value={formData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
        className="w-full mb-2 px-4 py-3 bg-transparent border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-black placeholder-black text-black"
        required
      />
      <div className="flex justify-end mb-6">
        <a href="/forgot-password" className="text-sm text-black hover:text-black transition-colors">Forgot password?</a>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mm-blue-btn w-full mb-4"
      >
        {loading ? "Logging in..." : "Log in"}
      </button>
    </form>
  )
}

export default LoginForm
