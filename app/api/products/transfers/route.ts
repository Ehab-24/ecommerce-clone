import getDb from "@/lib/db";
import { ApiTransferSchema } from "@/types/transfer";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../utils";

export async function POST(request: NextRequest) {
    try {

        const payload = ApiTransferSchema.parse(await request.json())

        const db = await getDb()
        const insertResult = await db.collection("transfers").insertOne(payload)
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

        const pipeline = [
            {
                $lookup: {
                    from: 'locations',
                    localField: 'origin',
                    foreignField: '_id',
                    as: 'origin'
                }
            },
            {
                $lookup: {
                    from: 'locations',
                    localField: 'destination',
                    foreignField: '_id',
                    as: 'destination'
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products',
                    foreignField: '_id',
                    as: 'products'
                }
            },
            {
                $project: {
                    ...fields?.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}),
                }
            }
        ]

        const db = await getDb()
        const transfers = await db.collection("transfers").aggregate(pipeline).limit(limit).skip(page * limit).toArray()

        return NextResponse.json(transfers, { status: 200 })

    }
    catch (error) {
        return errorResponse(error)
    }
}

