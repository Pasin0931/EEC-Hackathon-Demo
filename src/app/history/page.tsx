import { useState, useEffect } from "react"
import History from '@/components/history'

export default function history() {

    return (
        <div
            className="flex flex-cols justify-center items-center h-screen"
            style={{ backgroundImage: "url('/background.jpg')" }}>
            <History />
        </div>
    )
}