import { z } from "zod";
import { Product } from "./product";
import { Customer } from "./customer";
import { CustomItem, CustomItemSchema } from "./customItem";

const ApiOrderSchema = z.object({
  date: z.string().optional(),
  customer: z.string().optional(),
  channel: z.string().optional(),
  total: z.number().optional(),
  payment_status: z.string().optional(),
  fulfillment_status: z.string().optional(),
  products: z.array(CustomItemSchema),
  customItems: z.array(CustomItemSchema),
  delivery_status: z.string().optional(),
  delivery_method: z.string().optional(),
  tags: z.array(z.string()).optional(),
  // TODO: referenceNumber isnt optional
  referenceNumber: z.string(),
  note: z.string(),
  status: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

type ApiOrder = z.infer<typeof ApiOrderSchema>;

type ProductItem = Product & Omit<CustomItem, "_id">

type Order = Omit<Omit<Omit<Omit<ApiOrder, "createdAt">, "updatedAt">, "customer">, "products"> & {
  _id: string; createdAt: string; updatedAt: string; customer: Customer; products: ProductItem[]
}

export { type Order, ApiOrderSchema, type ApiOrder };
