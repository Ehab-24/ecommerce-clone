import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ApiTransferSchema } from "@/types/transfer"
import { ObjectId } from "mongodb"
import { errorResponse } from "@/app/api/utils"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const transfer = await db.collection("transfers").findOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(transfer, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const payload = ApiTransferSchema.parse(await request.json())
        payload.updatedAt = (new Date()).toString()

        const db = await getDb()
        const updateResult = await db.collection("transfers").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
        return NextResponse.json(updateResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("transfers").deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(deleteResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
