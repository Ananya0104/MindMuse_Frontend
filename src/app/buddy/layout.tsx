// --- UPDATED BuddyLayout with Sidebar Toggle Button ---

"use client"

import React from "react";
import { ChatSessionProvider } from "../../contexts/ChatSessionContext";
import { SidebarProvider } from "../../contexts/SidebarContext";



export default function BuddyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatSessionProvider>
      <SidebarProvider>
        <div className="flex h-screen bg-light-cream overflow-hidden relative">
          {/* Removed BuddySidebar and SidebarToggle */}
          <main className="flex-1 flex flex-col">{children}</main>
        </div>
      </SidebarProvider>
    </ChatSessionProvider>
  );
}