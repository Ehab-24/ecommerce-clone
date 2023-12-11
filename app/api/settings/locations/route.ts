import getDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../../utils";
import { ApiLocationSchema } from "@/types/location";

export async function POST(request: NextRequest) {
    try {
        const payload = ApiLocationSchema.parse(await request.json())
        const db = await getDb()

        payload.createdAt = new Date()
        payload.updatedAt = new Date()

        const insertResult = await db.collection("locations").insertOne(payload)
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
        const locations = await db.collection("locations").find(
            {},
            { projection: fields?.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}) }
        ).limit(limit).skip(page * limit).toArray()

        return NextResponse.json(locations, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}