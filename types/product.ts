import { z } from "zod";
import { Vendor } from "./vendor";
import { Location } from "./location";
import { SalesChannel } from "./salesChannel";
import { Market } from "./market";

const VariantOptionSchema = z.object({ name: z.string(), values: z.array(z.string()) })

const VariantSchema = z.object({
  _id: z.string(),
  name: z.string(),
  values: z.record(z.string().min(1, "Variant option must have a value")),
  weight: z.number().optional(),
  weightUnit: z.enum(["kg", "lb", "oz", "g"]).optional(),
  isPhysicalProduct: z.boolean().optional(),
  price: z.number().gte(0, "Variant Price must be greater than 0").optional(),
  compareAtPrice: z.number().gte(0, "Variant Compare at price must be greater than 0").optional(),
  chargeTaxes: z.boolean().optional(),
  quantity: z.number().optional(),
  countryOfOrigin: z.string().optional(),
  costPerItem: z.number().gte(0, "Variant Cost per item must be greater than 0").optional(),
  profit: z.number().optional(),
  margin: z.number().optional(),
  sku: z.string().optional(),
  hasSku: z.boolean().optional(),
  barcode: z.string().optional(),
  hsCode: z.string().optional(),
  image: z.string().nullable().optional(),
  trackQuantity: z.boolean(),
  continueSellingWhenOutOfStock: z.boolean(),
})

const ApiProductSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  description: z.string().optional(),
  price: z.number().gte(0, "Price must be greater than 0").optional(),
  compareAtPrice: z.number().gte(0, "Compare at price must be greater than 0").optional(),
  chargeTaxes: z.boolean(),
  taxRate: z.number(),
  tax: z.number(),
  costPerItem: z.number().gte(0, "Cost per item must be greater than 0").optional(),
  profit: z.number().optional(),
  margin: z.number().optional(),
  quantity: z.number().gte(0),
  trackQuantity: z.boolean(),
  continueSellingWhenOutOfStock: z.boolean(),
  hasSku: z.boolean(),
  sku: z.optional(z.string()),
  barcode: z.optional(z.string()),
  isPhysicalProduct: z.boolean(),
  weight: z.number().gte(0),
  weightUnit: z.enum(["kg", "lb", "oz", "g"]),
  countryOfOrigin: z.string(),
  status: z.enum(["active", "draft", "archived"]),
  category: z.string().optional(),
  type: z.string().optional(),
  vendor: z.string().optional(),
  collection: z.string(),
  tags: z.array(z.string().min(1)),
  variants: z.array(VariantSchema),
  locations: z.array(z.string()),
  variantOptions: z.array(VariantOptionSchema),
  variantImages: z.array(z.string()),
  salesChannels: z.array(z.string()),
  markets: z.array(z.string()),
  media: z.array(
    z.object({
      url: z.string(),
      type: z.enum(["image", "video"]),
    })
  ),
  seo: z.object({
    title: z.string().max(70, "SEO title must be less than 70 characters"),
    description: z.string(),
  }),
  createdAt: z.optional(z.union([z.string(), z.date()])),
  updatedAt: z.optional(z.union([z.string(), z.date()])),
});

type ApiProduct = z.infer<typeof ApiProductSchema>;
type Variant = z.infer<typeof VariantSchema>;

type VariantValue = z.infer<typeof VariantSchema>["values"];
type VariantOption = z.infer<typeof VariantOptionSchema>;

type Product = Omit<Omit<Omit<Omit<Omit<Omit<ApiProduct, "createdAt">, "updatedAt">, "vendor">, "locations">, "salesChannel">, "markets">
  & { _id: string; createdAt: string; updatedAt: string; vendor: Vendor; locations: Location[], salesChannels: SalesChannel[], markets: Market[] };

export { type Product, type VariantOption, ApiProductSchema, VariantSchema, type VariantValue, type ApiProduct, type Variant };
