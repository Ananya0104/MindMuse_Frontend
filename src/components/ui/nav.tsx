"use client"

import { Button } from "@/components/ui/button"
import { Menu } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

interface NavItem {
  label: string
  href: string
}

interface NavbarProps {
  navItems?: NavItem[]
}

export default function Navbar({ navItems = [] }: NavbarProps) {
  // Default navigation items if none provided
  const defaultNavItems: NavItem[] = [
    { label: "Home", href: "/dashboard" },
    { label: "Products", href: "#" },
    { label: "AI Companion", href: "#" },
    { label: "Contact", href: "#" },
  ]

  // Use provided navItems or default ones
  const items = navItems.length > 0 ? navItems : defaultNavItems

  return (
    <header className="flex items-center justify-between px-6 py-2 shadow-md" style={{ backgroundColor: "var(--color-light-cream)" }}>
      <div className="flex items-center">
        <Link href="/dashboard">
          <Image src="/godai-logo.png" alt="GODAI" width={100} height={40} className="h-10 w-auto" />
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-8" style={{ fontFamily: "DM Sans" }}>
        {items.map((item, index) => (
          <Link 
            key={index} 
            href={item.href} 
            className="hover:opacity-70 transition-opacity" 
            style={{ color: "var(--color-wood-brown)" }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-6 w-6" style={{ color: "var(--color-wood-brown)" }} />
      </Button>
    </header>
  )
}
