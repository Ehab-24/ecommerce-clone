import { Supplier, SupplierSchema } from "./supplier"
import { z } from "zod"

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

const ApiPurchaseOrderSchema = z.object({
    destination: z.string(),
    paymentTerms: z.optional(z.string()),
    status: z.enum(["draft", "ordered", "received", "cancelled"]),
    shipping: z.object({
        arrivalDate: z.date(),
        carrier: z.string(),
        trackingNumber: z.string(),
    }),
    products: z.array(z.string()),
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

type AdjustmentName = z.infer<typeof AdjustmentNames>
type ApiPurchaseOrder = z.infer<typeof ApiPurchaseOrderSchema>

type PurchaseOrder = Omit<Omit<Omit<ApiPurchaseOrder, "createdAt">, "updatedAt">, "supplier"> & {
    _id: string; createdAt: Date; updatedAt: Date; supplier: Supplier
};

export { ApiPurchaseOrderSchema, type PurchaseOrder, type AdjustmentName, type ApiPurchaseOrder }
