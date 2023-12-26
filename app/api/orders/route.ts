
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
                $addFields: {
                    customer: {
                        $cond: {
                            if: { $eq: ["$customer", null] },
                            then: null,
                            else: { $toObjectId: "$customer" }
                        }
                    }
                }
            },
            {
                $addFields: {
                    products: {
                        $map: {
                            input: "$products",
                            as: "product",
                            in: {
                                $mergeObjects: [
                                    "$$product",
                                    {
                                        _id: { $toObjectId: "$$product._id" } // Convert _id to ObjectId
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $unwind: "$products"
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products._id",
                    foreignField: "_id",
                    as: "products.productDetails"
                }
            },
            {
                $group: {
                    _id: "$_id",
                    products: {
                        $push: {
                            $mergeObjects: [
                                "$products",
                                { $arrayElemAt: ["$products.productDetails", 0] }
                            ]
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "customer",
                    foreignField: "_id",
                    as: "customer"
                }
            }

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

        if (fields.length) {
            pipeline.push({
                $project: {
                    ...fields?.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}),
                }
            })
        }

        const db = await getDb()
        const results = await db.collection("orders").aggregate(pipeline).limit(limit).skip(page * limit).toArray()

        const orders = results.map(res => ({ ...res, customer: res.customer[0] ?? null }))

        return NextResponse.json(orders, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
