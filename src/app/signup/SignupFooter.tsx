import Link from "next/link"
import React from "react"
import { APP_ROUTES } from "../../constants/navigation"

export default function SignupFooter() {
  return (
    <div className="mt-6 mb-8 text-center flex items-center justify-center gap-3">
      <span className="text-black">Already have an account?</span>
      <Link
        href={APP_ROUTES.AUTH.LOGIN}
        className="mm-blue-btn"
      >
        Log in
      </Link>
    </div>
  )
}
