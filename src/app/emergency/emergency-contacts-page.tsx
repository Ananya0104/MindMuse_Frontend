"use client"

import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import EmergencyContactsWelcome from "../../app/emergency/EmergencyWelcome"
import EmergencyContactsForm from "../../app/emergency/EmergencyContactsForm"
import {APP_ROUTES} from "../../constants/navigation"

import {apiCall} from "../../lib/api"

import{
  ApiError,
  ApiResponse,
} from "../../interfaces/auth"

import {
  CountryCode
} from "../../interfaces/user"

import {
  EmergencyContact
} from "../../interfaces/emergency"

import { getCurrentUserId } from "../../lib/auth"
import { API_ENDPOINTS, HTTP_METHODS } from "../../constants/api"
import { formatEmergencyContacts } from "../../lib/emergency_utils"
import { EMERGENCY } from "../../constants/errors"


export default function EmergencyContactsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([])

  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { name: "", email: "", countryCode: "+91", phoneNumber: "", relationship: "" },
  ])


  // Fetch country codes from backend
  useEffect(() => {
    setCountryCodes([
      { code: "+91", name: "India", flag: "🇮🇳" }
    ]);
  }, []);

  // Add a new empty contact
  const addContact = () => {
    setContacts((prev) => ([
      ...prev,
      { name: "", email: "", countryCode: "+91", phoneNumber: "", relationship: "" },
    ]))
  }

  // Remove a contact by index
  const removeContact = (index: number) => {
    setContacts((prev) => prev.filter((_, i) => i !== index))
  }

  const updateContact = (index: number, field: string, value: string) => {
    setContacts((prev) => prev.map((contact, i) => (i === index ? { ...contact, [field]: value } : contact)))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation logic to match backend
    if (contacts.length === 0) {
      setError("At least one emergency contact is required.")
      return
    }
    for (let i = 0; i < contacts.length; i++) {
      const c = contacts[i]
      const allFilled = c.name.trim() && c.email.trim() && c.phoneNumber.trim()
      const allEmpty = !c.name.trim() && !c.email.trim() && !c.phoneNumber.trim()
      if (i === 0) {
        if (!allFilled) {
          setError("First emergency contact is mandatory - all fields (name, email, phone) are required")
          return
        }
      } else {
        if (!allEmpty && !allFilled) {
          setError(`All fields (name, email, phone) are required for contact ${i + 1} if any field is filled`)
          return
        }
      }
    }

    // Filter out completely empty contacts for submission
    const filledContacts = contacts.filter(
      (c) => c.name.trim() || c.email.trim() || c.phoneNumber.trim()
    )

    // Check for duplicate phone numbers (countryCode + phoneNumber)
    for (let i = 0; i < filledContacts.length; i++) {
      for (let j = i + 1; j < filledContacts.length; j++) {
        const a = filledContacts[i]
        const b = filledContacts[j]
        if (
          a.phoneNumber.trim() &&
          b.phoneNumber.trim() &&
          a.countryCode === b.countryCode &&
          a.phoneNumber === b.phoneNumber
        ) {
          setError(EMERGENCY.DUPLICATE_PHONE(i, j))
          return
        }
      }
    }

    if (!agreedToTerms) {
      setError(EMERGENCY.TERMS_REQUIRED)
      return
    }

    try {
      setLoading(true)
      setError("")
      const userId = getCurrentUserId()
      if (!userId) {
        setError(EMERGENCY.USER_NOT_AUTHENTICATED)
        setLoading(false)
        return
      }
      const endpoint = `${API_ENDPOINTS.EMERGENCY_CONTACTS.CREATE_OR_UPDATE()}?userId=${userId}`
      const response: ApiResponse = await apiCall(
        endpoint,
        HTTP_METHODS.POST,
        { contacts: formatEmergencyContacts(filledContacts) }
      )
      if (response.message && response.message.toLowerCase().includes("success")) {
        setSuccess(response.message + "! 🎉")
        router.push(APP_ROUTES.DASHBOARD)
      }
    } catch (err) {
      const error = err as ApiError
      setError(EMERGENCY.FAILED_TO_SAVE(error.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full ">
      {/* Left Section: Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
      <div className="w-full max-w-2xl">
          {/* Welcome Section */}
          <EmergencyContactsWelcome />

          {/* Form Section */}
          <EmergencyContactsForm
            contacts={contacts}
            updateContact={updateContact}
            handleSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
            countryCodes={countryCodes}
            agreedToTerms={agreedToTerms}
            setAgreedToTerms={setAgreedToTerms}
            addContact={addContact}
            removeContact={removeContact}
          />
          
        </div>
      </div>

      {/* Right Section: Image Background */}
      <div
        className="hidden lg:block lg:w-1/2 fixed right-0 top-0 h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url("/mindmuse-back.png")' }}
      ></div>
    </div>
  )
}
