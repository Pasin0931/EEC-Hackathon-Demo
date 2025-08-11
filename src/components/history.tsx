"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface dataProps {
    id: number
    items: string
    points: number
    createdAt: string
}

export default function History() {

    const [userData, setUserData] = useState<dataProps[] | []>([])

    const [scanTime, setScanTime] = useState(0)
    const [totalPoints, setTotalPoints] = useState(0)

    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {

        setScanTime(0)
        setTotalPoints(0)
        setIsLoading(true)

        fetch('/api/scanApi')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setUserData(data)

                setScanTime(data.length)

            })
            .catch(error => {
                alert("Error fetching data")
                console.log("Error :", error)
                setIsLoading(true)
            })

        fetch('/api/allPoints')
            .then(res => res.json())
            .then(data => {
                if (data === null) {
                    setTotalPoints(0)
                } else {
                    setTotalPoints(data)
                }
                setIsLoading(false)
            })
            .catch((error) => {
                alert("Error fetching data")
                console.log("Error :", error)
                setIsLoading(true)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
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
                            <Card className="flex flex-cols items-center justify-center bg-transparent">
                                <Loader2 className="h-6 w-6 animate-spin text-white" />
                            </Card>
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
                        {userData.length === 0 ? (
                            <Card className="flex flex-cols justify-center items-center bg-black">
                                <h2 className="flex flex-cols justify-center items-center text-white">No Data</h2>
                            </Card>
                        ) : (
                            <div>
                                <Card className="overflow-y-auto h-72 bg-transparent gap-1 p-5 gap-3">
                                    {userData.map((usr: any) => (
                                        <Card key={usr.id} className="gap-2 p-4 bg-transparent text-white">
                                            <h3 className="text-bold">{usr.item}</h3>
                                            <h4>Points : {usr.points}</h4>
                                            <p>{usr.createdAt}</p>
                                        </Card>
                                    ))}
                                </Card>
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
