import Link from "next/link"
import React from "react"

export default function LoginFooter() {
  return (
    <div className="mt-6 mb-8 text-center flex items-center justify-center gap-3">
      <span className="text-black">Don&apos;t have an account?</span>
      <Link
        href="/signup"
        className="mm-blue-btn"
      >
        Sign up
      </Link>
    </div>
  )
}
