"use client"
import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Loader2 } from "lucide-react" // Import Loader2 for loading state

import type { SignupFormProps } from "../../interfaces/signup"

export default function SignupForm({
  formData,
  setFormData,
  handleSubmit,
  loading,
  error,
  success,
  countryCodes,
}: SignupFormProps) {
  const handleInputChange = (field: string, value: string | Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <>
      {/* Error/Success Messages */}
      {error && <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">{error}</div>}

      {success && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">{success}</div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 sm:space-y-4 bg-white/90 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg backdrop-blur-sm border border-blue-400/30"
      >
        {/* Full Name Field */}
        <div>
          <input
            type="text"
            placeholder="Full name"
            value={formData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            className="w-full px-4 py-3 bg-white/80 border border-blue-300/50 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-4 py-3 bg-white/80 border border-blue-300/50 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
            required
          />
        </div>

        {/* DOB Field */}
        <div>
          <DatePicker
            selected={formData.dob ? new Date(formData.dob) : null}
            onChange={(date) => handleInputChange("dob", date)}
            placeholderText="Date of Birth"
            className="w-full px-4 py-3 bg-white/80 border border-blue-300/50 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-500 custom-datepicker-input text-gray-800"
            dateFormat="dd/MM/yyyy"
            id="dob"
            name="dob"
            required
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            maxDate={new Date()}
          />
        </div>

        {/* Phone Number Field */}
        <div className="flex space-x-2">
          <select
            value={formData.countryCode}
            onChange={(e) => handleInputChange("countryCode", e.target.value)}
            className="w-24 px-3 py-3 bg-white/80 border border-blue-300/50 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-gray-800"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.code}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Phone number"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            className="flex-1 min-w-0 px-4 py-3 bg-white/80 border border-blue-300/50 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
            required
          />
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <input
            type="password"
            placeholder="Create your own password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="w-full px-4 py-3 bg-white/80 border border-blue-300/50 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder-gray-500 text-gray-800"
            required
          />
          <div className="text-xs pl-1 text-gray-600">
            • Minimum of 8 characters
            <br />• At least have 1 symbol
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="mm-blue-btn flex-1"
          >
            {loading ? <Loader2 className="inline-block h-5 w-5 animate-spin mr-2" /> : null}
            Continue
          </button>
        </div>
      </form>
    </>
  )
}
