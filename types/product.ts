import { z } from "zod";
import { Vendor } from "./vendor";

const ApiProductSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().gt(0, "Price must be greater than 0"),
  compareAtPrice: z.number().gt(0, "Compare at price must be greater than 0"),
  chargeTaxes: z.boolean(),
  taxRate: z.number(),
  tax: z.number(),
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
  weightUnit: z.enum(["kg", "lb", "oz", "g"]),
  countryOfOrigin: z.string(),
  status: z.enum(["active", "draft"]),
  productCategory: z.string().min(1, "Product category is required"),
  productType: z.string().min(1, "Product type is required"),
  vendor: z.string(),
  collection: z.string(),
  tags: z.array(z.string().min(1)).min(1, "At least one tag is required"),
  variants: z.array(
    z.object({
      name: z.string(),
      values: z
        .array(z.string())
        .min(1, "At least one variant value is required")
        .max(4, "Maximum of 4 variant values allowed"),
    })
  ),
  media: z.array(
    z.object({
      url: z.string(),
      type: z.enum(["image", "video"]),
    })
  ),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
  createdAt: z.optional(z.union([z.string(), z.date()])),
  updatedAt: z.optional(z.union([z.string(), z.date()])),
});

type ApiProduct = z.infer<typeof ApiProductSchema>;

type Product = Omit<
  Omit<Omit<ApiProduct, "createdAt">, "updatedAt">,
  "vendor"
> & { _id: string; createdAt: string; updatedAt: string; vendor: Vendor };

export { type Product, ApiProductSchema, type ApiProduct };
