import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { ApiCollectionSchema } from "@/types/collection"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const payload = ApiCollectionSchema.parse(await request.json())

    const db = await getDb()
    const updateResult = await db.collection("collections").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
    return NextResponse.json(updateResult, { status: 200 })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    const db = await getDb()
    const deleteResult = await db.collection("collections").deleteOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(deleteResult, { status: 200 })
}
