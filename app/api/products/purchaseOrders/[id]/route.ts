import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { ApiPurchaseOrderSchema } from "@/types/purchaseOrder"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const payload = ApiPurchaseOrderSchema.parse(await request.json())

    const db = await getDb()
    const updateResult = await db.collection("purchase_orders").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
    return NextResponse.json(updateResult, { status: 200 })
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    const db = await getDb()
    const deleteResult = await db.collection("purchase_orders").deleteOne({ _id: new ObjectId(params.id) })
    return NextResponse.json(deleteResult, { status: 200 })
}
