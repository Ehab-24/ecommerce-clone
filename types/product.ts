import { z } from "zod";
import { Vendor } from "./vendor";
import { Location } from "./location";

const VariantOptionSchema = z.object({ name: z.string(), values: z.array(z.string()) })

const VariantSchema = z.object({
  name: z.string(),
  values: z.record(z.string()),
  price: z.number().gt(0, "Variant Price must be greater than 0").optional(),
  quantity: z.number().optional(),
  country: z.string().optional(),
  costPerItem: z.number().gt(0, "Variant Cost per item must be greater than 0").optional(),
  profit: z.number().optional(),
  margin: z.number().optional(),
  sku: z.string().optional(),
  barcode: z.string().optional(),
  hsCode: z.string().optional(),
  images: z.array(z.string()).optional(),
})

const ApiProductSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  description: z.string().optional(),
  price: z.number().gte(0, "Price must be greater than 0").optional(),
  compareAtPrice: z.number().gt(0, "Compare at price must be greater than 0").optional(),
  chargeTaxes: z.boolean(),
  taxRate: z.number(),
  tax: z.number(),
  costPerItem: z.number().gt(0, "Cost per item must be greater than 0").optional(),
  profit: z.number().optional(),
  margin: z.number().optional(),
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
  status: z.enum(["active", "draft", "archived"]),
  productCategory: z.string().optional(),
  productType: z.string().optional(),
  vendor: z.string(),
  collection: z.string(),
  tags: z.array(z.string().min(1)),
  variants: z.array(VariantSchema),
  locations: z.array(z.string()),
  variantOptions: z.array(VariantOptionSchema),
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
type Variant = z.infer<typeof VariantSchema>;

type VariantValue = z.infer<typeof VariantSchema>["values"];
type VariantOption = z.infer<typeof VariantOptionSchema>;

type Product = Omit<Omit<Omit<Omit<ApiProduct, "createdAt">, "updatedAt">, "vendor">, "locations">
  & { _id: string; createdAt: string; updatedAt: string; vendor: Vendor; locations: Location[] };

export { type Product, type VariantOption, ApiProductSchema, type VariantValue, type ApiProduct, type Variant };
