"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UI_LABELS } from "@/constants/general"
import { APP_ROUTES } from "@/constants/navigation"
import { useAuthRedirect } from "@/hooks/useAuthRedirect"

export default function MoodTrackerPage() {
  const isLoadingAuth = useAuthRedirect(APP_ROUTES.DASHBOARD, APP_ROUTES.AUTH.LOGIN, true);
  

  // If the auth check is still loading, show a loading message or spinner
  if (isLoadingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{UI_LABELS.LOADING} Checking authentication...</p>
      </div>
    );
  }
  return (
    <div
      className="min-h-screen relative bg-light-cream"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "url(/mood.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.3,
        }}
      />

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title Section */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-blue-dark font-dm-sans">
            Mood & Sleep Tracker
          </h1>
          <p
            className="text-xl md:text-2xl italic mb-16 text-blue-dark font-dm-sans font-medium"
          >
            &quot;You&apos;re not moody-you&apos;re a whole weather system.&quot;
          </p>

          {/* Description */}
          <div className="space-y-6 mb-16">
            <p className="text-lg md:text-xl text-blue-dark font-dm-sans">
              Track your emotional patterns, energy dips, and sleep cycles in a way that actually makes sense. With
              Godai, your ups and downs become a map–helping you understand what lifts you, what drains you, and how to
              balance better.
            </p>
            <p className="text-lg md:text-xl text-blue-dark font-dm-sans">
              Because the more you know about your rhythms, the more you can work with yourself, not against it.
            </p>
            <p className="text-lg md:text-xl text-blue-dark font-dm-sans">
              No pressure to be consistent–just permission to be curious.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <Link href="/mood/check-in">
              <Button
                className="w-full md:w-auto px-10 py-6 text-xl font-semibold rounded-md shadow-md hover:shadow-lg transition-shadow bg-blue-dark text-light-cream font-dm-sans"
              >
                How Are You Feeling Today?
              </Button>
            </Link>

            <Link href="/mood/chart">
              <Button
                className="w-full md:w-auto px-10 py-6 text-xl font-semibold rounded-md shadow-md hover:shadow-lg transition-shadow bg-blue-dark text-light-cream font-dm-sans"
              >
                Show Me My Mood Chart!
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
