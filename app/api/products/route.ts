import getDb from "@/lib/db";
import { ApiProductSchema } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../utils";

export async function POST(request: NextRequest) {
    try {
        const payload = ApiProductSchema.parse(await request.json())
        const db = await getDb()

        payload.createdAt = (new Date()).toString()
        payload.updatedAt = (new Date()).toString()

        const insertResult = await db.collection("products").insertOne(payload)
        return NextResponse.json(insertResult, { status: 201 })

    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function GET(request: NextRequest) {
    try {

        const searchParams = request.nextUrl.searchParams
        const fields: string[] = searchParams.get('fields')?.split(',') || []
        const limit = Number(searchParams.get('limit') || 20)
        const page = Number(searchParams.get('page') || 0)

        const db = await getDb()
        const products = await db.collection("products").find(
            {},
            { projection: fields?.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}) }
        ).limit(limit).skip(page * limit).toArray()

        return NextResponse.json(products, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
