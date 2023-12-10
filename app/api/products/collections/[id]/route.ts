import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { ApiCollectionSchema } from "@/types/collection"
import { errorResponse } from "../../utils"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const payload = ApiCollectionSchema.parse(await request.json())

        const db = await getDb()
        const updateResult = await db.collection("collections").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
        return NextResponse.json(updateResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("collections").deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(deleteResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
