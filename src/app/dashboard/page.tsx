"use client"

import React from "react"
import { Card } from "../../components/ui/card"
import { Leaf, MessageCircle, Moon, Shield, Heart } from "lucide-react"
import Link from "next/link"
import { APP_ROUTES } from "../../constants/navigation"
import Image from "next/image"

const features = [
  {
    id: "journal",
    title: "Inner Child Entries",
    description:
      "A safe, tender space to revisit younger parts of yourself. Write to your 7-year-old self. Let your 12-year-old self speak. Because healing often begins when we finally listen.",
    icon: Leaf,
    link: APP_ROUTES.JOURNAL.ROOT,
  },
  {
    id: "buddy",
    title: "AI-Powered Therapy Companion",
    description:
      "Talk freely. Be heard — without judgment, without pressure. Our AI understands emotion, reflects your words with care, and supports you like a compassionate listener who's always there.",
    icon: MessageCircle,
    link: APP_ROUTES.BUDDY,
  },
  {
    id: "mood",
    title: "Mood & Sleep Tracker",
    description:
      "Track your emotional highs and lows, your rest patterns, and energy flow. Find gentle patterns in your day-to-day that reveal what your mind might be trying to say.",
    icon: Moon,
    link: "/mood",
  },
  {
    id: "survey",
    title: "Your Mental Wellness Score",
    description:
      "Not a grade — a gentle mirror. Based on your entries, habits, and emotions, your wellness score helps you see how you're doing holistically — so you can grow with awareness, not pressure.",
    icon: Shield,
    link: APP_ROUTES.SURVEY,
  },
  {
    id: "sos",
    title: "SOS & Emergency Support",
    description:
      "When things feel too heavy to carry, MindMuse lets you reach out — instantly. Message your emergency contacts, access calming tools, or simply pause with breathwork when crisis hits. Because asking for help is the strongest thing you can do.",
    icon: Heart,
    link: "/sos",
  },
]

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/dash.png"
        alt="Dashboard background"
        fill
        className="object-cover z-0"
        priority
      />
      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-center mt-12 mb-8 text-black">Try our Features</h1>
        <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* First four cards */}
            {features.slice(0, 4).map((feature) => (
              <Card key={feature.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start h-64">
                <feature.icon className="h-8 w-8 text-[#80BADD] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="mb-4 text-gray-700 text-sm flex-1">{feature.description}</p>
                <Link href={feature.link} passHref legacyBehavior>
                  <a className="mt-auto px-4 py-2 rounded bg-[#80BADD]/90 text-white font-semibold shadow hover:bg-[#80BADD] transition">Go to {feature.title}</a>
                </Link>
              </Card>
            ))}

            {/* Last card centered */}
            <div className="col-span-1 sm:col-span-2 flex justify-center">
              <Card className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start h-64 w-full">
                {React.createElement(features[4].icon, { className: "h-8 w-8 text-[#80BADD] mb-4" })}
                <h3 className="text-xl font-semibold mb-2">{features[4].title}</h3>
                <p className="mb-4 text-gray-700 text-sm flex-1">{features[4].description}</p>
                <Link href={features[4].link} passHref legacyBehavior>
                  <a className="mt-auto px-4 py-2 rounded bg-[#80BADD]/90 text-white font-semibold shadow hover:bg-[#80BADD] transition">Go to {features[4].title}</a>
                </Link>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
