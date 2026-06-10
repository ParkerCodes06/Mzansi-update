import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { MobileNav } from "@/components/layout/MobileNav"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "MzansiUpdate — Soweto's Digital Newspaper",
  description: "Hyperlocal news and alerts for Soweto. Load shedding, SASSA grants, lotto results, jobs, traffic, water, and weather.",
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f5f6f8] text-gray-900">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-6 pb-24 sm:pb-6">
          {children}
        </main>
        <MobileNav />
      </body>
    </html>
  )
}
