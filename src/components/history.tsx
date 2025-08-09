"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface dataProps {
    id: number
    items: string
    points: number
    createAt: string
}

export default function History() {

    const [userData, setUserData] = useState<dataProps[] | null>(null)

    const [scanTime, setScanTime] = useState(0)
    const [totalPoints, setTotalPoints] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const mockingData: dataProps[] = [
            { id: 1, items: "Plastic bag", points: 1, createAt: "50/5/2000" },
            { id: 2, items: "Plastic bottle", points: 1.5, createAt: "50/5/2000" }
        ]

        setUserData(mockingData)
        // setUserData(null)

        const totalPoints = mockingData.reduce((sum, item) => sum + item.points, 0)
        setTotalPoints(totalPoints)

        setScanTime(mockingData.length)
    }, [])

    return (
        <div className="flex flex-cols justify-center items-center h-screen">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 }}
                className="w-120">

                <Card className="p-10 bg-black/70 text-white border-4 border-white rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500">
                    <h1 className="font-bold text-4xl text-center mb-2 tracking-wide">History</h1>
                    <h2 className="text-center">This is your previous scan history.</h2>
                    <div>
                        {!userData ? (
                            <Card className="flex flex-cols justify-center items-center bg-black">
                                <h2 className="flex flex-cols justify-center items-center text-white">No Data</h2>
                            </Card>
                        ) : (
                            <div>
                                {userData.map((usr: any) => (
                                    <Card key={usr.id} className="gap-2 p-4 bg-transparent text-white mb-3">
                                        <h3 className="text-bold">{usr.items}</h3>
                                        <h4>Points : {usr.points}</h4>
                                        <p>{usr.createAt}</p>
                                    </Card>
                                ))}
                                <h5 className="flex flex-cols justify-center items-center mt-5">Accumulative point : {totalPoints}</h5>
                                <h5 className="flex flex-cols justify-center items-center">Total scan time : {scanTime}</h5>
                            </div>
                        )}
                    </div>
                    <Link href={'/'} className="w-full">
                        <Button variant={"outline"} className="hover:text-black cursor-pointer transition duration-300 bg-black w-full">
                            Return to Menu
                        </Button>
                    </Link>
                </Card>

            </motion.div>
        </div >
    )
}
