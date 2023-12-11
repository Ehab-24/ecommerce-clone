import { z } from "zod";
import { Product } from "./product";

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

type ApiTransfer = z.infer<typeof ApiTransferSchema>;

type Transfer = Omit<Omit<Omit<ApiTransfer, "createdAt">, "updatedAt">, "products"> & {
  _id: string; products: Product[]; createdAt: Date; updatedAt: Date;
};

export { type Transfer, ApiTransferSchema, type ApiTransfer };
