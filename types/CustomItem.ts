import { z } from "zod";

const CustomItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  taxable: z.boolean(),
  physical: z.boolean(),
  weight: z.number(),
  weightUnit: z.string(),
});

type CustomItem = z.infer<typeof CustomItemSchema>;
export { type CustomItem, CustomItemSchema };
