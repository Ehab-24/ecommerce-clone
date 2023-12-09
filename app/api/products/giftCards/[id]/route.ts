import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { ApiGiftCardSchema } from "@/types/giftCard"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const payload = ApiGiftCardSchema.parse(await request.json())

    const db = await getDb()
    const updateResult = await db.collection("gift_cards").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
    return NextResponse.json(updateResult, { status: 200 })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    const db = await getDb()
    const deleteResult = await db.collection("gift_cards").deleteOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(deleteResult, { status: 200 })
}
