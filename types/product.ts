
import { z } from "zod"

const ProductSchema = z.object({
  _id: z.optional(z.string()),
  title: z.string().min(1, "Product title is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().gt(0, "Price must be greater than 0"),
  compareAtPrice: z.number().gt(0, "Compare at price must be greater than 0"),
  chargeTaxes: z.boolean(),
  costPerItem: z.number().gt(0, "Cost per item must be greater than 0"),
  profit: z.number(),
  margin: z.number(),
  trackQuantity: z.boolean(),
  quantity: z.number().gte(0),
  continueSellingWhenOutOfStock: z.boolean(),
  hasSku: z.boolean(),
  sku: z.optional(z.string()),
  barcode: z.optional(z.string()),
  isPhysicalProduct: z.boolean(),
  weight: z.number().gte(0),
  weightUnit: z.string(),
  countryOfOrigin: z.string(),
  status: z.enum(['active', 'draft']),
  productCategory: z.string().min(1, "Product category is required"),
  productType: z.string().min(1, "Product type is required"),
  vendor: z.string().min(1, "Vendor is required"),
  collections: z.string(),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
})

type Product = z.infer<typeof ProductSchema>
export { ProductSchema, type Product }
