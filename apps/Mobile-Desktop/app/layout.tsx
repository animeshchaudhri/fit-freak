import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"
import { MainLayout } from "@/components/layouts/main-layout"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FitTrack",
  description: "Your personal fitness companion",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          
          <MainLayout>{children}
          <Toaster position="top-center" richColors />

          </MainLayout>
        </AuthProvider>
      </body>
    </html>
  )
}

