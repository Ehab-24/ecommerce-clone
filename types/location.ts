import { z } from "zod"

const LocationSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  country: z.string(),
  address: z.string(),
  apartment: z.string().optional(),
  city: z.string(),
  postalCode: z.string(),
  phone: z.string(),
  fulfilOrders: z.boolean(),
  status: z.enum(["active", "inactive"]),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type Location = z.infer<typeof LocationSchema>;

export { LocationSchema, type Location }
