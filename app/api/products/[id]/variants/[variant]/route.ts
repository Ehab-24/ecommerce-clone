
import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { errorResponse } from "@/app/api/utils"
import { ApiVariantSchema } from "@/types/product"


export async function PUT(request: NextRequest, { params }: { params: { id: string, variant: string } }) {
    try {

        const payload = await request.json()
        const variant = ApiVariantSchema.parse(payload)
        const db = await getDb()
        const updateResult = await db.collection("products").updateOne({ _id: new ObjectId(params.id) }, { $set: { [`variants.${params.variant}`]: variant } })
        return NextResponse.json(updateResult, { status: 200 })

    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string, variant: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("products").updateOne({ _id: new ObjectId(params.id) }, { $pull: { variants: { _id: params.variant } } })
        return NextResponse.json(deleteResult, { status: 200 })

    }
    catch (error) {
        return errorResponse(error)
    }
}
