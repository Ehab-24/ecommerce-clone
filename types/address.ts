import { z } from "zod";

const AddressSchema = z.object({
  country: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  company: z.string(),
  address: z.string(),
  apartment: z.string(),
  city: z.string(),
  postalCode: z.string(),
  phone: z.string(),
});

type Address = z.infer<typeof AddressSchema>;

export { type Address, AddressSchema };
