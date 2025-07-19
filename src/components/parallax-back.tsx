"use client"

import Image from "next/image"
import React, { useState, useEffect, useCallback } from "react"


export default function ParallaxBackground() {
  const [offsetY, setOffsetY] = useState(0)

  const handleScroll = useCallback(() => {
    setOffsetY(window.scrollY)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  return (
    // <div className="absolute inset-0 w-full h-full overflow-hidden">
    //   <Image
    //     src={"/new.jpg"}
    //     alt={alt}
    //     width={20000}
    //     height={200}
    //     className="object-cover  object-left z-0 transition-transform duration-75 ease-out"
    //     style={{ transform: `translateY(${offsetY * speed}px)` }}
    //     priority
    //   />
    // </div>
    <section className="relative flex-1 flex flex-col items-center justify-center p-4 text-center">
      <Image 
        src="/new.png" 
        alt="Background" 
        fill
        className="object-cover z-0 opacity-50"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      />
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-dark-wood mb-6">Talk to AI Therapist</h1>
        <p className="text-dark-wood italic mb-8 text-lg">Happiness in your pocket</p>
        <div className="space-y-4 text-dark-wood leading-relaxed">
          <p>
            When things feel heavy, AI Therapist is just a tap away. Like a wise friend and a warm hug in one, it
            listens without judging, offers clarity in life&apos;s tangled knots, and reminds you to breathe when you forget
            how.
          </p>
          <p>
            Select a specialized AI therapist from the sidebar to begin your conversation.
          </p>
        </div>
      </div>
    </section>
  )
  
}
