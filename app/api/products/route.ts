import getDb from "@/lib/db";
import { ApiProductSchema } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";
import { errorResponse } from "../utils";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
    try {
        const payload = ApiProductSchema.parse(await request.json())
        const db = await getDb()

        /* ts-ignore */
        payload.createdAt = (new Date()).toString()
        payload.updatedAt = (new Date()).toString()

        const insertResult = await db.collection("products").insertOne(payload)
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
        const products = await db.collection("products").aggregate(pipeline).toArray()

        return NextResponse.json(products, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
