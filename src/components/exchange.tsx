"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Scan() {

    const [totalPoints, setTotalPoints] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

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

    return (
        <div className="flex flex-cols justify-center items-center h-screen">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 }}>
                <div className="flex justify-end">
                    <Card className="flex flex-row items-center w-25 p-3 border-white border-4 rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500 bg-black/70 text-white mb-2">{totalPoints} points</Card>
                </div>
                <Card className="p-10 bg-black/70 text-white border-4 border-white rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500">
                    <h1 className="font-bold text-4xl text-center tracking-wide">Exchange</h1>
                    <h2 className="text-center tracking-wide mb-2">You can exchange your points for reward here !</h2>
                    <Link href={'/'} className="w-full">
                        <Button variant={"outline"} className="hover:text-black cursor-pointer transition duration-300 bg-black w-full">
                            Return to Menu
                        </Button>
                    </Link>
                </Card>

            </motion.div>
        </div>
    )
}
