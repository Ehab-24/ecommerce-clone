import { z } from "zod";
import { LocationSchema } from "./location";
import { ProductSchema } from "./product";

const TransferSchema = z.object({
  _id: z.string().optional(),
  origin: LocationSchema,
  destination: LocationSchema,
  products: z.array(ProductSchema),
  shipping: z.object({
    arrivalDate: z.date(),
    carrier: z.string(),
    trackingNumber: z.string(),
  }),
  referenceNumber: z.string(),
  tags: z.array(z.string()),
  status: z.enum(["pending", "draft", "received"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type Transfer = z.infer<typeof TransferSchema>;

export { TransferSchema, type Transfer };
