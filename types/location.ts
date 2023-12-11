import { z } from "zod"


const ApiLocationSchema = z.object({
  name: z.string(),
  country: z.string(),
  address: z.string(),
  apartment: z.string().optional(),
  city: z.string(),
  postalCode: z.string(),
  phone: z.string(),
  fulfilOrders: z.boolean(),
  status: z.enum(["active", "inactive"]),
  isDefault: z.boolean(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type ApiLocation = z.infer<typeof ApiLocationSchema>;

type Location = Omit<Omit<ApiLocation, "createdAt">, "updatedAt"> & {
  _id: string; createdAt: Date; updatedAt: Date;
};

export { type Location, ApiLocationSchema, type ApiLocation }
