"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import Link from "next/link"

import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [aboutUs, setAboutUs] = useState(false)

  const [totalPoints, setTotalPoints] = useState(0)

  const fetchData = async () => {
    setIsLoading(true)
    fetch(`/api/allPoints`)
      .then(res => res.json())
      .then(data => {
        setTotalPoints(data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log("Error :", error)
        setIsLoading(true)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <Card className="p-10 bg-black/70 text-white border-4 border-white rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500">
          <Loader2 className="animate-spin text-white" />
        </Card>
      </div>
    )
  }

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.jpg')" }}>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}>
        <div className="flex justify-end">
          <Card className="flex flex-row items-center w-35 p-3 border-white border-4 rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500 bg-black/70 text-white mb-2">{totalPoints} points</Card>
        </div>
        <Card className="p-10 bg-black/70 text-white border-4 border-white rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500">
          <h1 className="font-bold text-4xl text-center mb-8 tracking-wide">Eco-Rewards</h1>

          {aboutUs ? (

            <motion.div
              className="text-lg text-center text-white"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
            >
              <div className="mb-9 text-sm max-w-lg mx-auto leading-relaxed space-y-5">
                <p>We are a small group of developers who share the same dream: creating clean public spaces.</p>
                <p>Starting from the closest area in our environment — Kasetsart University — we aim to provide a fun and impactful way for everyone to contribute.</p>
                <p>With Eco-Rewards, every time you collect and scan trash, you earn points. These points can be exchanged for rewards, turning your effort into something valuable.</p>
                <p>Our goal is simple: make environmental care easy, engaging, and rewarding, while inspiring others to join the movement for a cleaner future.</p>
                <p>Together, let’s turn waste into worth and keep our campus beautiful for everyone.</p>
              </div>
              <Button variant="outline" onClick={() => setAboutUs(false)}>
                Return to Menu
              </Button>
            </motion.div>

          ) : (

            <div className="flex flex-col items-center justify-center gap-4 text-lg">

              <Link href={'/scan'} className="w-full">
                <Button variant="outline" className="hover:text-black cursor-pointer transition duration-300 bg-black w-full">
                  Scan
                </Button>
              </Link>

              <Link href={'/menu'} className="w-full">
                <Button variant="outline" className="hover:text-black cursor-pointer transition duration-300 bg-black w-full">
                  Menu
                </Button>
              </Link>

              <Link href={'/exchange'} className="w-full">
                <Button variant="outline" className="hover:text-black cursor-pointer transition duration-300 bg-black w-full">
                  Exchange
                </Button>
              </Link>

              <Link href={'/history'} className="w-full">
                <Button variant="outline" className="hover:text-black cursor-pointer transition duration-300 bg-black w-full">
                  History
                </Button>
              </Link>

              <Button variant="outline" className="hover:text-black cursor-pointer transition duration-300 bg-black w-full"
                onClick={() => setAboutUs(true)}>
                About us
              </Button>

            </div>

          )}
        </Card>
      </ motion.div>
    </div>
  )


}
