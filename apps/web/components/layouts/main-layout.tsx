"use client";

import { MobileNav } from "@/components/navigation/mobile-nav";
import { DesktopSidebar } from "@/components/navigation/desktop-sidebar";
import { useAuth } from "@/components/auth/auth-provider";
import { useEffect, useState } from "react";
import { Router } from "lucide-react";
import { usePathname } from "next/navigation";

export function MainLayout({ children }: { children: React.ReactNode }) {
 
  const pathname = usePathname();
  if (pathname.includes("onboarding") || pathname.includes("login")) {
    return <>{children}</>;
  }

  
  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Desktop Sidebar */}
      <DesktopSidebar className="hidden lg:block" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 pb-16 lg:pb-0 overflow-auto">
          <div className="h-full max-w-7xl mx-auto px-4 py-6 lg:px-8">
            {children}
          </div>
        </main>

        {/* Mobile Navigation */}
        <MobileNav className="lg:hidden fixed bottom-0 left-0 right-0" />
      </div>
    </div>
  );
}
