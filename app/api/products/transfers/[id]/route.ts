import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ApiTransferSchema } from "@/types/transfer"
import { ObjectId } from "mongodb"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const payload = ApiTransferSchema.parse(await request.json())

    const db = await getDb()
    const updateResult = await db.collection("transfers").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
    return NextResponse.json(updateResult, { status: 200 })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    const db = await getDb()
    const deleteResult = await db.collection("transfers").deleteOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(deleteResult, { status: 200 })
}
