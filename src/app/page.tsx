"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface HomePageProps {
  id: number
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  // Theme handler
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (prefersDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  if (isLoading) {
    return (
      <h1>Loading</h1>
    )
  }

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <Card className="p-10 bg-black/70 text-white border-4 border-white rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500">
        <h1 className="font-bold text-4xl text-center mb-8 tracking-wide">EEC Hackathon</h1>
        <div className="flex flex-col items-center justify-center gap-4 text-lg">
          <p className="hover:underline hover:text-yellow-300 cursor-pointer transition duration-300">Menu</p>
          <p className="hover:underline hover:text-yellow-300 cursor-pointer transition duration-300">Scan</p>
          <p className="hover:underline hover:text-yellow-300 cursor-pointer transition duration-300">History</p>
          <p className="hover:underline hover:text-yellow-300 cursor-pointer transition duration-300">About us</p>
        </div>
      </Card>
    </div>
  )

}
