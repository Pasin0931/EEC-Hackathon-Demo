import { NextResponse } from 'next/server'
import { removeById } from '@/lib/promotion'

export async function DELETE(request, { params }) {
    try {

        const { id } = await params
        const result = removeById(Number.parseInt(id))

        console.log(id)

        if (result.changes > 0) {
            return NextResponse.json({ message: "Deleted" })
        } else {
            return NextResponse.json({ error: "Not found" }, { status: 404 })
        }

    } catch (error) {
        console.log("Error deleting :", error)
        return NextResponse.json({ error: "Failed" }, { status: 500 })
    }
}