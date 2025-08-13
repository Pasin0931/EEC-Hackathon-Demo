import { NextResponse } from 'next/server'
import { clearDb, getAllData, insertData } from '@/lib/promotion'

export async function GET() {
    try {
        const data = await getAllData()
        return NextResponse.json(data)
    } catch (error) {
        console.log("Error :", error)
        return NextResponse.json({ error: "Error fetching data." }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const { promotion, cost, picture, createdAt } = await request.json()

        if (!promotion.trim() || !cost || !picture.trim()) {
            return NextResponse.json({ error: "All elements required." }, { status: 400 })
        }

        const data = await insertData(promotion, cost, picture, createdAt)

        if (data.changes > 0) {
            return NextResponse.json({ message: "Data inserted." }, { status: 200 })
        } else {
            console.log("Failed to insert new data.")
            return NextResponse.json({ error: "Failed to insert new data." }, { status: 500 })
        }
    } catch (error) {
        console.log("Failed to insert new data :", error)
        return NextResponse.json({ error: "Failed to insert new data." }, { status: 500 })
    }
}

export async function DELETE() {
    try {
        clearDb()
        return NextResponse.json({ message: "Database cleared." }, { status: 200 })
    } catch (error) {
        console.log("Error clearing database :", error)
        return NextResponse.json({ error: "Failed to clear database" }, { status: 500 })
    }
}