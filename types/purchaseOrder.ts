import { Supplier } from "./supplier"
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
    destination: z.string().min(1, "Destination is required"),
    paymentTerms: z.optional(z.string()),
    status: z.enum(["draft", "ordered", "received", "cancelled"]),
    shipping: z.object({
        arrivalDate: z.date(),
        carrier: z.string(),
        trackingNumber: z.string(),
    }),
    products: z.array(z.string()).min(1, "At least one product is required"),
    total: z.number().min(0, "Total must be greater than 0"),
    referenceNumber: z.string().min(1, "Reference number is required"),
    noteToSupplier: z.string(),
    tags: z.array(z.string()),
    supplier: z.string().min(1, "Supplier is required"),
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
