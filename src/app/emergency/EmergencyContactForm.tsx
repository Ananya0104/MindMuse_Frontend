"use client"
import React from "react"
interface EmergencyContact {
  name: string
  email: string
  countryCode: string
  phoneNumber: string
  relationship: string
}

interface EmergencyContactFormProps {
  contactIndex: number
  contact: EmergencyContact
  updateContact: (index: number, field: string, value: string) => void
  countryCodes: Array<{ code: string; name: string; flag: string }>
}

export default function EmergencyContactForm({
  contactIndex,
  contact,
  updateContact,
  countryCodes,
}: EmergencyContactFormProps) {
  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-lg font-medium" style={{ color: "var(--color-dark-wood)" }}>
        Emergency Contact {contactIndex + 1}
      </h3>

      {/* Emergency Contact Name */}
      <div>
        <input
          type="text"
          placeholder="Emergency Contact Name"
          value={contact.name}
          onChange={(e) => updateContact(contactIndex, "name", e.target.value)}
          className="w-full px-4 py-3 bg-white/70 border border-wood-brown/30 rounded-md focus:outline-none focus:ring-1 focus:ring-wood-brown placeholder-gray-500"
          style={{ color: "var(--color-dark-wood)" }}
          required
        />
      </div>

      {/* Email Address */}
      <div>
        <input
          type="email"
          placeholder="Email address"
          value={contact.email}
          onChange={(e) => updateContact(contactIndex, "email", e.target.value)}
          className="w-full px-4 py-3 bg-white/70 border border-wood-brown/30 rounded-md focus:outline-none focus:ring-1 focus:ring-wood-brown placeholder-gray-500"
          style={{ color: "var(--color-dark-wood)" }}
          required
        />
      </div>

      {/* Phone Number */}
      <div className="flex space-x-2">
        <select
          value={contact.countryCode}
          onChange={(e) => updateContact(contactIndex, "countryCode", e.target.value)}
          className="px-3 py-3 bg-white/70 border border-wood-brown/30 rounded-md focus:outline-none focus:ring-1 focus:ring-wood-brown"
          style={{ color: "var(--color-dark-wood)" }}
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
          value={contact.phoneNumber}
          onChange={(e) => updateContact(contactIndex, "phoneNumber", e.target.value)}
          className="flex-1 px-4 py-3 bg-white/70 border border-wood-brown/30 rounded-md focus:outline-none focus:ring-1 focus:ring-wood-brown placeholder-gray-500"
          style={{ color: "var(--color-dark-wood)" }}
          required
        />
      </div>

      {/* Relationship */}
      <div>
        <input
          type="text"
          placeholder="Relationship"
          value={contact.relationship}
          onChange={(e) => updateContact(contactIndex, "relationship", e.target.value)}
          className="w-full px-4 py-3 bg-white/70 border border-wood-brown/30 rounded-md focus:outline-none focus:ring-1 focus:ring-wood-brown placeholder-gray-500"
          style={{ color: "var(--color-dark-wood)" }}
          required
        />
      </div>
    </div>
  )
}
