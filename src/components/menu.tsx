"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Menu() {

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
                        <h1 className="font-bold text-4xl text-center tracking-wide">Menu</h1>
                        <h2 className="text-center tracking-wide mb-2">This list displays the point value for each item.</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-5 mb-2">
                            <Card className="p-4 text-center gap-2 bg-transparent text-white">
                                <img src="/images/aluminum-can.jpg" alt="Aluminum Can" className="mx-auto mb-2 w-18 h-18 object-contain border-2 border-white rounded" />
                                <h3>Aluminum Can</h3>
                                <h4>0.1 Point</h4>
                            </Card>
                            <Card className="p-4 text-center gap-2 bg-transparent text-white">
                                <img src="/images/banana-peel.jpeg" alt="Banana Peel" className="mx-auto mb-2 w-18 h-18 object-contain border-2 border-white rounded" />
                                <h3>Banana Peel</h3>
                                <h4>0.1 Point</h4>
                            </Card>
                            <Card className="p-4 text-center gap-2 bg-transparent text-white">
                                <img src="/images/cardboard-box.jpg" alt="Cardboard Box" className="mx-auto mb-2 w-18 h-18 object-contain border-2 border-white rounded" />
                                <h3>Cardboard Box</h3>
                                <h4>0.1 Point</h4>
                            </Card>
                            <Card className="p-4 text-center gap-2 bg-transparent text-white">
                                <img src="/images/chip-bag.jpg" alt="Chip Bag" className="mx-auto mb-2 w-18 h-18 object-contain border-2 border-white rounded" />
                                <h3>Chip Bag</h3>
                                <h4>0.1 Point</h4>
                            </Card>
                            <Card className="p-4 text-center gap-2 bg-transparent text-white">
                                <img src="/images/food-wrapper.jpg" alt="Food Wrapper" className="mx-auto mb-2 w-18 h-18 object-contain border-2 border-white rounded" />
                                <h3>Food Wrapper</h3>
                                <h4>0.1 Point</h4>
                            </Card>
                            <Card className="p-4 text-center gap-2 bg-transparent text-white">
                                <img src="/images/glass-jar.jpg" alt="Glass Jar" className="mx-auto mb-2 w-18 h-18 object-contain border-2 border-white rounded" />
                                <h3>Glass Jar</h3>
                                <h4>0.1 Point</h4>
                            </Card>
                            <Card className="p-4 text-center gap-2 bg-transparent text-white">
                                <img src="/images/old-newspaper.jpg" alt="Old Newspaper" className="mx-auto mb-2 w-18 h-18 object-contain border-2 border-white rounded" />
                                <h3>Old Newspaper</h3>
                                <h4>0.1 Point</h4>
                            </Card>
                            <Card className="p-4 text-center gap-2 bg-transparent text-white">
                                <img src="/images/plastic-bottle.jpg" alt="Plastic Bottle" className="mx-auto mb-2 w-18 h-18 object-contain border-2 border-white rounded" />
                                <h3>Plastic Bottle</h3>
                                <h4>0.1 Point</h4>
                            </Card>
                            <Card className="p-4 text-center gap-2 bg-transparent text-white">
                                <img src="/images/styrofoam-cup.jpg" alt="Styrofoam Cup" className="mx-auto mb-2 w-18 h-18 object-contain border-2 border-white rounded" />
                                <h3>Styrofoam Cup</h3>
                                <h4>0.1 Point</h4>
                            </Card>
                            <Card className="p-4 text-center gap-2 bg-transparent text-white">
                                <img src="/images/stainless_can.png" alt="Styrofoam Cup" className="mx-auto mb-2 w-18 h-18 object-contain border-2 border-white rounded" />
                                <h3>Stainless Can</h3>
                                <h4>0.1 Point</h4>
                            </Card>
                        </div>

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
