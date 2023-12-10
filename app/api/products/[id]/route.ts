import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { ApiProductSchema } from "@/types/product"
import { errorResponse } from "../../utils"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const payload = ApiProductSchema.parse(await request.json())
        payload.updatedAt = new Date()

        const db = await getDb()
        const updateResult = await db.collection("products").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
        return NextResponse.json(updateResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("products").deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(deleteResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
