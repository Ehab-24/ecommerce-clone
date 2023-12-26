
import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { ApiOrderSchema } from "@/types/order"
import { errorResponse } from "../../utils"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const order = await db.collection("orders").findOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(order, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const data = await request.json()

        const payload = ApiOrderSchema.parse(data)
        payload.updatedAt = (new Date()).toString()

        const db = await getDb()
        const updateResult = await db.collection("orders").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
        return NextResponse.json(updateResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("orders").deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(deleteResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
