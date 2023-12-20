import { z } from "zod";
import { ApiProductSchema } from "./product";
import { CustomerSchema } from "./customer";

const OrderSchema = z.object({
  _id: z.string().optional(),
  date: z.string().optional(),
  customer: CustomerSchema,
  channel: z.string().optional(),
  total: z.number().optional(),
  payment_status: z.string().optional(),
  fulfillment_status: z.string().optional(),
  items: z.array(ApiProductSchema).optional(),
  delivery_status: z.string().optional(),
  delivery_method: z.string().optional(),
  tags: z.array(z.string()).optional(),

  status: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

type Order = z.infer<typeof OrderSchema>;
export { type Order, OrderSchema };
