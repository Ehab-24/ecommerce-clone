import { SupplierSchema } from "./supplier"
import { z } from "zod"
import { ProductSchema } from "./product"

const AdjustmentNames = z.enum([
    "Shipping",
    "Customs duties",
    "Discount",
    "Foreign transaction fee",
    "Freight fee",
    "Insurance",
    "Rush fee",
    "Surcharge",
    "Other"
])

const PurchaseOrderSchema = z.object({
    _id: z.string(),
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
    costAdjustments: z.array(z.object({
        name: AdjustmentNames,
        value: z.number(),
    })),
    currency: z.string(),
    createdAt: z.optional(z.date()),
    updatedAt: z.optional(z.date()),
});

const ApiPurchaseOrderSchema = z.object({
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
    supplier: z.string(),
    costAdjustments: z.array(z.object({
        name: AdjustmentNames,
        value: z.number(),
    })),
    currency: z.string(),
    createdAt: z.optional(z.date()),
    updatedAt: z.optional(z.date()),
});

type PurchaseOrder = z.infer<typeof PurchaseOrderSchema>
type AdjustmentName = z.infer<typeof AdjustmentNames>
type ApiPurchaseOrder = z.infer<typeof ApiPurchaseOrderSchema>

export { PurchaseOrderSchema, ApiPurchaseOrderSchema, type PurchaseOrder, type AdjustmentName, type ApiPurchaseOrder }
