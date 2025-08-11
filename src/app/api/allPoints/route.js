import { NextResponse } from "next/server"
import { clearDb, scandataDB } from '@/lib/database'

export async function GET() {
    try {

        const data = await scandataDB.getTotalPoints()
        return NextResponse.json(data)

    } catch (error) {
        console.log("Error :", error)
        return NextResponse.json({error: "Error"}, {status: 500})
    }
}