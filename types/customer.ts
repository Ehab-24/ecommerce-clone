import { z } from "zod";
import { AddressSchema } from "./address";

const CustomerSchema = z.object({
  _id: z.any().optional(),
  firstName: z.string(),
  lastName: z.string(),
  language: z.string(),
  email: z.string(),
  phone: z.string(),

  marketing: z.boolean(),
  smsMarketing: z.boolean(),

  address: AddressSchema,

  taxExempt: z.boolean(),

  note: z.string(),

  tags: z.array(z.any()),
});

type Customer = z.infer<typeof CustomerSchema>;
export { type Customer, CustomerSchema };
