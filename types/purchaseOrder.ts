import { SupplierSchema } from "./supplier"
import { AdjustmentSchema } from "./adjustment"
import { z } from "zod"
import { ProductSchema } from "./product"

const PurchaseOrderSchema = z.object({
    _id: z.optional(z.string()),
    destination: z.string(),
    paymentTerms: z.optional(z.string()),
    status: z.enum(["draft", "ordered", "received", "cancelled"]),
    shipping: z.object({
        arrivalDate: z.date(),
        carrier: z.string(),
        trackingNumber: z.string(),
    }),
    products: z.array(ProductSchema),
    total: z.number(),
    referenceNumber: z.string(),
    noteToSupplier: z.string(),
    tags: z.array(z.string()),
    supplier: SupplierSchema,
    costAdjustments: z.array(AdjustmentSchema),
});

type PurchaseOrder = z.infer<typeof PurchaseOrderSchema>

export { PurchaseOrderSchema, type PurchaseOrder }
