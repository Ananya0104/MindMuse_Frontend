import { Button } from "../components/ui/button"
import Image from "next/image"
import React from "react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <section className="relative min-h-screen flex flex-col items-start justify-center p-4 text-left pl-8">
      <Image 
        src="/new.png" 
        alt="Background" 
        fill
        className="object-cover z-0 opacity-100"
        priority
      />
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-10">MindMuse is Here for You.</h1>
        <p className="mb-8 text-lg text-gray-700 leading-relaxed">
          Your mind holds stories worth listening to. It&apos;s a gentle companion to help you understand your thoughts,
          reconnect with your emotions, and build habits that nurture your peace.
        </p>
        <Button
          asChild
          className="mt-8 px-8 py-6 text-lg bg-white text-gray-800 shadow-md hover:bg-gray-100 border border-gray-200"
        >
          <Link href="/signup">GET STARTED</Link>
        </Button>
      </div>
    </section>

    
  )
}
