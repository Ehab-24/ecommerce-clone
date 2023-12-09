import { z } from "zod";
import { LocationSchema } from "./location";
import { ProductSchema } from "./product";

const TransferSchema = z.object({
  _id: z.string(),
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

const ApiTransferSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  products: z.array(z.string()),
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
type ApiTransfer = z.infer<typeof ApiTransferSchema>;

export { TransferSchema, type Transfer, ApiTransferSchema, type ApiTransfer };
