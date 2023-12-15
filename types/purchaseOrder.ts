import { Product } from "./product";
import { Supplier } from "./supplier"
import { z } from "zod"
import { Location } from "./location";

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
        arrivalDate: z.string().optional(),
        carrier: z.string(),
        trackingNumber: z.string(),
    }),
    // TODO: change 0 to 1 after implementing 'browse' dialog
    products: z.array(z.string()).min(0, "At least one product is required"),
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
    createdAt: z.optional(z.string()),
    updatedAt: z.optional(z.string()),
});

type AdjustmentName = z.infer<typeof AdjustmentNames>
type ApiPurchaseOrder = z.infer<typeof ApiPurchaseOrderSchema>

type PurchaseOrder = Omit<Omit<Omit<Omit<Omit<ApiPurchaseOrder, "createdAt">, "updatedAt">, "supplier">, "products">, "destination"> & {
    _id: string; createdAt: string; updatedAt: string; supplier: Supplier; products: Product[]; destination: Location
};

export { ApiPurchaseOrderSchema, type PurchaseOrder, type AdjustmentName, type ApiPurchaseOrder }
