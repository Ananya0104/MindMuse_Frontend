// components/Footer.jsx
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className="bg-medium-cream py-8  border-t border-dark-cream" id="contact">
            <div className="flex flex-col justify-center items-center text-dark-wood gap-y-5">
                <h2 className="text-dark-wood text-3xl font-bold">Contact</h2>
                <Link className="text-black" href="mailto:team@godaiwellness.com">team@godaiwellness.com</Link>
                <div className="text-black">© 2025 Godai. All rights reserved.</div>
            </div>
        </footer>
    )
}