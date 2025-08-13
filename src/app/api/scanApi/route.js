import { NextResponse } from 'next/server'
import { clearDb, historyDb } from '@/lib/database'

export async function GET() {
    try {
        const data = await historyDb.getAllData()
        return NextResponse.json(data)
    } catch (error) {
        console.log("Error :", error)
        return NextResponse.json({ error: "Error fetching data." }, { status: 500 })
    }
}

export async function POST(request) {
    try {
        const body = await request.json()
        // console.log("POSTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT YEAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH:", body)

        const { item, points, createdAt } = body

        if (!item.trim() || !points) {
            return NextResponse.json({ error: "All elements required." }, { status: 400 })
        }

        const data = await historyDb.insertData(item, points, createdAt)

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