
import getDb from "@/lib/db";
import { ApiOrderSchema } from "@/types/order";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../utils";

export async function POST(request: NextRequest) {
    try {
        const payload = ApiOrderSchema.parse(await request.json())
        const db = await getDb()

        payload.createdAt = (new Date()).toString()
        payload.updatedAt = (new Date()).toString()

        const insertResult = await db.collection("orders").insertOne(payload)
        console.log(insertResult)
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
        const q = searchParams.get('q')

        const pipeline: any = [
            {
                $skip: limit * page
            },
            {
                $limit: limit
            },
        ]

        if (q) {
            pipeline.push({
                $match: {
                    $or: [
                        { name: { $regex: q, $options: 'i' } },
                        { description: { $regex: q, $options: 'i' } },
                    ]
                }
            })
        }

        if (fields && fields.length > 0) {
            pipeline.push({
                $project: {
                    _id: 1,
                    ...fields.reduce((acc, field) => {
                        acc[field] = 1
                        return acc
                    }, {} as { [key: string]: number })
                }
            })
        }

        const db = await getDb()
        const orders = await db.collection("orders").aggregate(pipeline).toArray()

        return NextResponse.json(orders, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
