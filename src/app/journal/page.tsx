import { Button } from "../../components/ui/button"
import Link from "next/link"
import React from "react"

export default function JournalPage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center p-4 text-center"
      style={{ backgroundImage: 'url("/journal-background.png")' }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center w-full max-w-4xl gap-8 px-4 mt-16">
        {" "}
        {/* Added mt-16 for spacing from nav */}
        <div className="flex flex-col gap-4 mt-8 md:mt-0 md:ml-auto w-full md:w-auto">
          <Button
            asChild
            className="px-8 py-6 text-lg bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 shadow-md w-full"
          >
            <Link href="/journal/new-entry">Write New Entry</Link>
          </Button>
          <Button
            asChild
            className="px-8 py-6 text-lg bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 shadow-md w-full"
          >
            <Link href="/journal/entries">Your Entries</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
