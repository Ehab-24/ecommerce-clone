import { z } from "zod";
import { Product } from "./product";
import { Location } from "./location";

const ApiTransferSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  // TODO: change 0 to 1 after implementing 'browse' dialog
  products: z.array(z.string()).min(0, "Atleast one product is required"),
  shipping: z.object({
    arrivalDate: z.union([z.string(), z.date()]).optional(),
    carrier: z.string(),
    trackingNumber: z.string(),
  }),
  referenceNumber: z.string().min(1, "Reference number is required"),
  tags: z.array(z.string()),
  status: z.enum(["pending", "draft", "received"]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

type ApiTransfer = z.infer<typeof ApiTransferSchema>;

type Transfer = Omit<Omit<Omit<Omit<Omit<ApiTransfer, "createdAt">, "updatedAt">, "products">, "origin">, "destination"> & {
  _id: string; products: Product[]; createdAt: string; updatedAt: string; origin: Location; destination: Location;
};

export { type Transfer, ApiTransferSchema, type ApiTransfer };
