import { z } from "zod";
import { ApiProductSchema } from "./product";
import { Customer } from "./customer";

const ApiOrderSchema = z.object({
  date: z.string().optional(),
  customer: z.string(),
  channel: z.string().optional(),
  total: z.number().optional(),
  payment_status: z.string().optional(),
  fulfillment_status: z.string().optional(),
  items: z.array(ApiProductSchema).optional(),
  delivery_status: z.string().optional(),
  delivery_method: z.string().optional(),
  tags: z.array(z.string()).optional(),
  // TODO: referenceNumber isnt optional
  referenceNumber: z.string(),
  status: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

type ApiOrder = z.infer<typeof ApiOrderSchema>;

type Order = Omit<Omit<Omit<ApiOrder, "createdAt">, "updatedAt">, "customer"> & {
  _id: string; createdAt: string; updatedAt: string; customer: Customer;
}

export { type Order, ApiOrderSchema, type ApiOrder };
