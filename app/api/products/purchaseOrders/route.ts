import getDb from "@/lib/db";
import { ApiPurchaseOrderSchema } from "@/types/purchaseOrder";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const payload = ApiPurchaseOrderSchema.parse(await request.json())

    const db = await getDb()
    const insertResult = await db.collection("purchase_orders").insertOne(payload)
    return NextResponse.json(insertResult, { status: 201 })
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const fields: string[] = searchParams.get('fields')?.split(',') || []
    const limit = Number(searchParams.get('limit') || 20)
    const page = Number(searchParams.get('page') || 0)

    const pipeline = [
        {
            $lookup: {
                from: 'products',
                localField: 'products',
                foreignField: '_id',
                as: 'products'
            }
        },
        {
            $lookup: {
                from: "suppliers",
                localField: "supplier",
                foreignField: "_id",
                as: "supplier"
            }
        },
        {
            $project: {
                ...fields?.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}),
            }
        }
    ]

    const db = await getDb()
    const purchaseOrders = await db.collection("purchase_orders").aggregate(pipeline).limit(limit).skip(page * limit).toArray()

    return NextResponse.json(purchaseOrders, { status: 200 })
}
