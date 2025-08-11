"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Loader2 } from "lucide-react"

interface PromotionProps {
    id: number
    promotion: string
    cost: number
    picture: string
    createdAt: string
}

export default function Scan() {

    const [totalPoints, setTotalPoints] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    const [promotions, setPromotions] = useState<PromotionProps[] | []>([])

    // const promotions = [
    //     { promotion: "Lazada", image: "/images/lazada.png" },
    //     { promotion: "Shopee", image: "/images/shopee.png" },
    //     { promotion: "Advice", image: "/images/advice.png" },
    //     { promotion: "Banana", image: "/images/banana.png" },
    //     { promotion: "JIB", image: "/images/jib.png" }
    // ]

    const fetchData = async () => {
        setIsLoading(true)
        fetch(`/api/allPoints`)
            .then(res => res.json())
            .then(data => {
                setTotalPoints(data)
                // setIsLoading(false)
            })
            .catch(error => {
                console.log("Error :", error)
                setIsLoading(true)
            })

        fetch(`/api/promotions`)
            .then(res => res.json())
            .then(data => {
                setPromotions(data)
                setIsLoading(false)
            })
            .catch(error => {
                console.log("error :", error)
                setIsLoading(true)
            })
    }

    const claimButton = async (id: number, promotion: string, cost: number) => {
        try {
            if (!confirm("Are you sure you want to claim this item ?")) {
                return
            }

            if (totalPoints < cost) {
                return alert("Your points are not enough !")
            }

            let minusCost = cost * -1
            let timeNow = new Date().toISOString()
            const newData = {
                item: promotion,
                points: minusCost,
                createdAt: timeNow
            }
            const res = await fetch('/api/scanApi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            })

            if (res.ok) {
                console.log("Claimed")
                alert("Claimed")
                fetchData()
            }

            const removePromotion = await fetch(`/api/promotions/${id}`, { method: "DELETE" })
            if (removePromotion.ok) {
                fetchData()
            }
        } catch (error) {
            console.error("Error :", error)
            alert("Error !!")
        }
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
                <div className="flex flex-cols justify-center items-center h-screen">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.05 }}
                        className="w-120">
                        <div className="flex justify-end">
                            <Card className="flex flex-row items-center w-25 p-3 border-white border-4 rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500 bg-black/70 text-white mb-2">{totalPoints} points</Card>
                        </div>
                        <Card className="p-10 bg-black/70 text-white border-4 border-white rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500">
                            <h1 className="font-bold text-4xl text-center mb-2 tracking-wide">Echange</h1>
                            <h2 className="text-center">You can exchange your point for reward here !</h2>
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
            </div>
        )
    }

    return (
        <div
            className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <div className="flex flex-cols justify-center items-center h-screen">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 }}>
                    <div className="flex justify-end">
                        <Card className="flex flex-row items-center w-35 p-3 border-white border-4 rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500 bg-black/70 text-white mb-2">{totalPoints} points</Card>
                    </div>
                    <Card className="p-10 bg-black/70 text-white border-4 border-white rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500 w-200">
                        <h1 className="font-bold text-4xl text-center tracking-wide">Exchange</h1>
                        <h2 className="text-center tracking-wide mb-2">You can exchange your point for reward here !</h2>

                        <Card className="bg-transparent text-white p-5">
                            {promotions.length === 0 ? (
                                <h1 className="font-bold flex items-center justify-center p-30">No avalible item yet.</h1>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-5 mb-2 overflow-y-auto h-76">
                                    {promotions.map(promo => (
                                        <Card key={promo.id} className="p-4 text-center gap-2 bg-transparent text-white h-58">
                                            <img src={promo.picture} className="mx-auto mb-2 w-18 h-18 object-contain border-2 border-white rounded bg-white" />
                                            <h3>{promo.promotion}</h3>
                                            <h4>{promo.cost} Points</h4>
                                            <Button variant={"outline"} className="hover:text-black cursor-pointer transition duration-300 bg-black w-full mt-2"
                                                onClick={() => claimButton(promo.id, promo.promotion, promo.cost)}>
                                                Claim
                                            </Button>
                                        </Card>
                                    ))
                                    }
                                </div>
                            )}
                        </Card>

                        <Link href={'/'} className="w-full">
                            <Button variant={"outline"} className="hover:text-black cursor-pointer transition duration-300 bg-black w-full">
                                Return to Menu
                            </Button>
                        </Link>
                    </Card>

                </motion.div>
            </div>
        </div>
    )
}
