"use client"

import React, { useRef, useEffect } from "react"
import EmergencyContactForm from "../../app/emergency/EmergencyContactForm" // Corrected import path

interface EmergencyContact {
  name: string
  email: string
  countryCode: string
  phoneNumber: string
  relationship: string
}

interface EmergencyContactsFormProps {
  contacts: EmergencyContact[]
  updateContact: (index: number, field: string, value: string) => void
  handleSubmit: (e: React.FormEvent) => Promise<void>
  loading: boolean
  error: string
  success: string
  countryCodes: Array<{ code: string; name: string; flag: string }>
  agreedToTerms: boolean
  setAgreedToTerms: (agreed: boolean) => void
  addContact: () => void
  removeContact: (index: number) => void
}

export default function EmergencyContactsForm({
  contacts,
  updateContact,
  handleSubmit,
  loading,
  error,
  success,
  countryCodes,
  agreedToTerms,
  setAgreedToTerms,
  addContact,
  removeContact,
}: EmergencyContactsFormProps) {
  const lastContactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contacts.length > 1 && lastContactRef.current) {
      lastContactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [contacts.length]);

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
        className="space-y-6 bg-white/90 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg backdrop-blur-sm border border-blue-400/30"
      >
        {/* Emergency Contacts */}
        {contacts.map((contact, index) => (
          <div key={index} className="relative" ref={index === contacts.length - 1 ? lastContactRef : null}>
            <EmergencyContactForm
              contactIndex={index}
              contact={contact}
              updateContact={updateContact}
              countryCodes={countryCodes}
            />
            {contacts.length > 1 && (
              <button
                type="button"
                onClick={() => removeContact(index)}
                className="absolute top-0 right-0 text-red-600 hover:text-red-800 text-sm px-2 py-1"
                aria-label="Remove contact"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        {/* Add Contact Button */}
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={addContact}
            className="px-4 py-2 rounded-md text-white text-sm"
            style={{ backgroundColor: '#80BADD' }}
            disabled={contacts.length >= 3}
          >
            + Add Another Contact
          </button>
        </div>
        {/* Terms and Conditions Checkbox */}
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 bg-white border-blue-300/20 rounded focus:ring-blue-600 focus:ring-2"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            By clicking, you agree to Our Terms & Conditions AND Privacy Policy.
          </label>
        </div>
        {/* Continue Button */}
        <button
          type="submit"
          disabled={loading || !agreedToTerms}
          className="w-full py-3 rounded-md text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#80BADD' }}
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </form>
    </>
  )
}
