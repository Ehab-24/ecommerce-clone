import getDb from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const payload = await request.json()
    const db = await getDb()
    const insertResult = await db.collection("products").insertOne(payload)
    return NextResponse.json(insertResult, { status: 201 })
}

export async function GET(request: NextRequest) {
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
