"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Scan() {

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

                    <Card className="p-10 bg-black/70 text-white border-4 border-white rounded-2xl shadow-2xl backdrop-blur-lg transition-all duration-500">
                        <h1 className="font-bold text-4xl text-center mb-2 tracking-wide">Scanning . . .</h1>
                        <Card className="p-40">
                            -- Scan --
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
