import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { ApiPurchaseOrderSchema } from "@/types/purchaseOrder"
import { errorResponse } from "@/app/api/utils"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const payload = ApiPurchaseOrderSchema.parse(await request.json())
        payload.updatedAt = new Date()

        const db = await getDb()
        const updateResult = await db.collection("purchase_orders").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
        return NextResponse.json(updateResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("purchase_orders").deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(deleteResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
