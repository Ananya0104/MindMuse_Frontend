"use client"
import React, { useState, useEffect, useRef } from "react"
import { Check, Clock, Send} from "lucide-react"

// Dummy data and functions for demonstration

type EmergencyContact = {
  name: string
  email: string
  relationship: string
  status?: string
}

async function getEmergencyContacts(): Promise<EmergencyContact[]> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "Alice Smith", email: "alice@example.com", relationship: "Friend" },
        { name: "Bob Johnson", email: "bob@example.com", relationship: "Family" },
      ])
    }, 500)
  })
}

async function createOrUpdateEmergencyContacts(
  contacts: EmergencyContact[]
): Promise<void> {
  // Simulate API call to update contacts status
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Updating contacts:", contacts)
      resolve()
    }, 500)
  })
}

async function sendSOSToContacts(message: string): Promise<EmergencyContact[]> {
  // Simulate sending SOS message and updating contact status
  const contacts = await getEmergencyContacts()
  const updatedContacts = contacts.map((contact) => ({ ...contact, status: "sent" })) // Simulate all sent
  await createOrUpdateEmergencyContacts(updatedContacts)
  console.log("SOS Message Sent:", message)
  return updatedContacts
}

export default function SOSPage() {
  const [sosStatus, setSOSStatus] = useState<"idle" | "countdown" | "sending" | "sent" | "unsent">("idle")
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(20)
  const [showCancelModal, setShowCancelModal] = useState(false)

  const countdownRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch contacts on page load
  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true)
        const fetchedContacts = await getEmergencyContacts()
        setContacts(fetchedContacts)
        setError(null)
      } catch (err) {
        setError("Unable to load emergency contacts")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    loadContacts()
  }, [])

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [])

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-white text-black">Loading...</div>
  }
  if (error) {
    return <div className="flex items-center justify-center h-screen bg-white text-red-600">{error}</div>
  }

  const startCountdown = () => {
    setSOSStatus("countdown")
    setCountdown(20)
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownRef.current) clearInterval(countdownRef.current)
          sendSOSAutomatically()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const sendSOSAutomatically = async () => {
    setSOSStatus("sending")
    try {
      const message =
        "You’re not alone—support is just a tap away. In overwhelming moments, the MindMuse SOS feature helps you stay grounded and connected. With one click, calming tools and trusted contacts are activated—no need to search, no need to think twice. You deserve to feel safe. You deserve to be heard. Press SOS. Find your anchor."
      const updatedContacts = await sendSOSToContacts(message)
      setContacts(updatedContacts)
      setSOSStatus("sent")
    } catch (err) {
      setError("Failed to send SOS. Please try again.")
      setSOSStatus("idle")
      console.error(err)
    }
  }

  const handleSOSClick = () => {
    startCountdown()
  }

  const handleCancelClick = () => {
    setShowCancelModal(true)
  }

  const confirmCancel = () => {
    if (countdownRef.current) clearInterval(countdownRef.current)
    setSOSStatus("unsent")
    setShowCancelModal(false)
    setCountdown(20)
    setTimeout(() => {
      setSOSStatus("idle")
    }, 3000)
  }

  const cancelCancel = () => {
    setShowCancelModal(false)
  }

  const resetToIdle = () => {
    setSOSStatus("idle")
    setContacts(contacts.map((contact) => ({ ...contact, status: undefined })))
  }

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "delivered":
        return <Check className="h-4 w-4 text-green-400" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "sent":
        return <Send className="h-4 w-4 text-blue-400" />
      default:
        return null
    }
  }

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url(/sos.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#254C47",
      }}
    >
      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm" style={{ backgroundColor: "rgba(37, 76, 71, 0.4)" }}>
          <div
            className="p-8 rounded-lg shadow-xl max-w-md mx-4 text-center"
            style={{ backgroundColor: "#254C47", border: "2px solid #254C47" }}
          >
            <h3 className="text-2xl font-bold mb-4" style={{ color: "#F8F0E5", fontFamily: "DM Sans" }}>
              Cancel SOS?
            </h3>
            <p className="text-lg mb-8" style={{ color: "#F8F0E5", fontFamily: "DM Sans" }}>
              Are you sure you want to cancel the SOS alert?
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={cancelCancel}
                className="py-3 text-lg font-semibold"
                style={{
                  backgroundColor: "#F8F0E5",
                  color: "#254C47",
                  fontFamily: "DM Sans",
                  border: "1px solid #F8F0E5",
                }}
              >
                NO
              </button>
              <button
                onClick={confirmCancel}
                className="py-3 text-lg font-semibold"
                style={{
                  backgroundColor: "#254C47",
                  color: "#F8F0E5",
                  fontFamily: "DM Sans",
                  border: "1px solid #F8F0E5",
                }}
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Main Title */}
              <h1
                className="text-5xl md:text-6xl font-bold italic leading-tight"
                style={{ color: "#254C47", fontFamily: "DM Sans" }}
              >
                Support is just a tap away.
              </h1>
              {/* Description */}
              <div className="space-y-6 text-lg" style={{ color: "#254C47", fontFamily: "DM Sans" }}>
                <p>
                Overwhelmed? Scared? Lost in the moment?
                With MindMuse SOS, you&apos;re never alone. Instantly alert someone you trust and access tools that help you breathe, refocus, and stay grounded.
                </p>
                
              </div>
              {/* Sample Message */}
              <div className="p-10 rounded-lg max-w-md" style={{ backgroundColor: "#F8F0E5", color: "#254C47" }}>
                <p className="text-base leading-relaxed" style={{ fontFamily: "DM Sans" }}>
                Hey, I&apos;m struggling right now. Please reach out. My location is shared.
                — Sent via MindMuse SOS
                </p>
                <p className="text-sm mt-4 text-right opacity-80" style={{ fontFamily: "DM Sans" }}>
                  – Sent from MindMuse SOS
                </p>
              </div>
              {/* Bottom Tagline */}
              <p className="text-2xl font-semibold" style={{ color: "#254C47", fontFamily: "DM Sans" }}>
              Help. Calm. Connection. All in one tap.
              </p>
            </div>
            {/* The right column (phone mockup) has been removed */}
          </div>
        </div>
      </main>
      {/* SOS Button and Status - Centered below content */}
      <div className="flex flex-col items-center mt-0.5">
        {/* SOS Button / Status Circle */}
        {sosStatus === "unsent" ? (
          <div
            className="w-48 h-48 rounded-full flex items-center justify-center text-white text-6xl font-bold mb-1"
            style={{
              backgroundColor: "#22C55E",
              boxShadow: "0 0 40px rgba(37, 76, 71, 0.5)",
            }}
          >
            <Check className="h-20 w-20" />
          </div>
        ) : (
          <button
            onClick={handleSOSClick}
            disabled={sosStatus === "sending" || sosStatus === "countdown"}
            className={`w-48 h-48 rounded-full flex items-center justify-center text-white text-5xl font-bold transition-all duration-300 mb-4 ${
              sosStatus === "countdown" ? "animate-pulse" : "hover:scale-105"
            }`}
            style={{
              backgroundColor: sosStatus === "sent" ? "#DC2626" : "#EF4444",
              boxShadow: "0 0 40px rgba(37, 76, 71, 0.5)",
            }}
          >
            {sosStatus === "countdown" ? countdown : "SOS"}
          </button>
        )}
        {/* Countdown Display */}
        {sosStatus === "countdown" && (
          <div className="text-center">
            <p className="text-white text-lg font-bold mb-2" style={{ fontFamily: "DM Sans" }}>
              Sending in {countdown}s
            </p>
            <p className="text-white/70 text-sm" style={{ fontFamily: "DM Sans" }}>
              Tap cancel to stop
            </p>
          </div>
        )}
        {/* Cancel Button - Only show during countdown */}
        {sosStatus === "countdown" && (
          <div className="mt-6">
            <button
              onClick={handleCancelClick}
              className="w-full py-3 rounded-lg text-red-500 font-semibold transition-colors hover:bg-white/10"
              style={{
                backgroundColor: "white",
                fontFamily: "DM Sans",
                maxWidth: "256px"
              }}
            >
              Cancel SOS
            </button>
          </div>
        )}
        {/* Status Display */}
        {(sosStatus === "sending" || sosStatus === "sent") && (
          <div className="space-y-6 mt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "DM Sans" }}>
                {sosStatus === "sending" ? "Sending SOS..." : "SOS Sent"}
              </h3>
              <p className="text-white/80" style={{ fontFamily: "DM Sans" }}>
                {sosStatus === "sending" ? "Reaching out for help..." : "Help is on the way"}
              </p>
            </div>
            {sosStatus === "sent" && (
              <>
                {/* Contact Status */}
                <div className="space-y-3">
                  <p className="text-white/90 text-sm" style={{ fontFamily: "DM Sans" }}>
                    Message sent to {contacts.length} emergency contacts :-
                  </p>
                  {contacts.map((contact) => (
                    <div key={contact.email} className="flex items-center justify-between text-white/80">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(contact.status)}
                        <span style={{ fontFamily: "DM Sans" }}>{contact.name}</span>
                      </div>
                      <span className="text-sm capitalize" style={{ fontFamily: "DM Sans" }}>
                        {contact.status}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Reset Button */}
                <button
                  onClick={resetToIdle}
                  className="w-full py-3 rounded-lg text-green-600 font-semibold transition-colors hover:bg-white/10"
                  style={{
                    backgroundColor: "white",
                    fontFamily: "DM Sans",
                    maxWidth: "256px"
                  }}
                >
                  Close
                </button>
              </>
            )}
          </div>
        )}
        {/* Unsent State */}
        {sosStatus === "unsent" && (
          <div className="text-center space-y-4 mt-6">
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "DM Sans" }}>
              SOS Unsent
            </h3>
            <p className="text-white/80" style={{ fontFamily: "DM Sans" }}>
              Emergency alert has been cancelled successfully
            </p>
            <p className="text-white/60 text-sm" style={{ fontFamily: "DM Sans" }}>
              No messages were sent to your contacts
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
