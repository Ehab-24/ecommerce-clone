
import { NextRequest, NextResponse } from "next/server"
import getDb from "@/lib/db"
import { ObjectId } from "mongodb"
import { ApiOrderSchema } from "@/types/order"
import { errorResponse } from "../../utils"

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {


        const db = await getDb()
        const pipeline: any = [
            {
                $match: {
                    _id: new ObjectId(params.id)
                }
            },
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

        const result = await db.collection("orders").aggregate(pipeline).toArray()
        const order = { ...result[0], customer: result[0].customer[0] ?? null }
        return NextResponse.json(order, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {

        const data = await request.json()

        const payload = ApiOrderSchema.parse(data)
        payload.updatedAt = (new Date()).toString()

        const db = await getDb()
        const updateResult = await db.collection("orders").updateOne({ _id: new ObjectId(params.id) }, { $set: payload })
        return NextResponse.json(updateResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {

        const db = await getDb()
        const deleteResult = await db.collection("orders").deleteOne({ _id: new ObjectId(params.id) })
        return NextResponse.json(deleteResult, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
