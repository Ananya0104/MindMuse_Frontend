import React from "react";
import Link from "next/link";
import { User, CreditCard, Users, Settings } from "lucide-react";
import Image from "next/image";

const navItems = [
  { label: "Profile", icon: User, href: "/profile" },
  { label: "Subscription & Billing", icon: CreditCard, href: "/subscription" },
  { label: "Referral", icon: Users, href: "/referral" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export default function AccountLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#f5f1eb]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#fff] border-r border-[#e5d5c8] flex flex-col py-8 px-4">
        <div className="flex items-center mb-10">
          <Image src="/godai-logo.png" alt="Godai Logo" width={40} height={40} />
          <span className="ml-3 text-xl font-bold text-[#5B3016]">Godai</span>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-[#5B3016] hover:bg-[#f5e8dd] font-medium transition-colors"
            >
              <Icon className="h-5 w-5 text-[#8b7355]" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-[#e5d5c8] bg-white shadow-sm">
          <h1 className="text-2xl font-bold text-[#5B3016]">{title}</h1>
          <div className="flex items-center gap-4">
            {/* User avatar placeholder */}
            <div className="w-10 h-10 rounded-full bg-[#e5d5c8] flex items-center justify-center">
              <User className="h-6 w-6 text-[#8b7355]" />
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 flex flex-col items-center justify-start bg-[#f5f1eb]">{children}</main>
      </div>
    </div>
  );
} 