import { z } from "zod";

const CustomItemSchema = z.object({
  _id: z.string(),
  name: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number(),
  taxable: z.boolean().optional(),
  physical: z.boolean().optional(),
  weight: z.number().optional(),
  weightUnit: z.enum(["kg", "lb", "oz", "g"]).optional(),
});

type CustomItem = z.infer<typeof CustomItemSchema>;
export { type CustomItem, CustomItemSchema };
