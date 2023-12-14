import getDb from "@/lib/db";
import { NextResponse } from "next/server";
import { errorResponse } from "../../utils";

// TODO: implement actual product_type routes
export async function GET() {
    try {
        const db = await getDb()
        const pipeline = [
            {
                $group: {
                    _id: "$productType",
                }
            },
        ]
        const types = await db.collection('products').aggregate(pipeline).toArray()

        return NextResponse.json(types, { status: 200 })
    }
    catch (error) {
        return errorResponse(error)
    }
}
