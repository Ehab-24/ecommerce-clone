import { z } from "zod"
import { CustomerSchema } from "./customer";

const GiftCardSchema = z.object({
  _id: z.string(),
  code: z.string(),
  status: z.enum(["active", "inactive", "redeemed"]),
  initialValue: z.number(),
  hasExpiry: z.boolean(),
  customer: CustomerSchema,
  internalNotes: z.optional(z.string()),
  expiresAt: z.optional(z.date()),
  createdBy: z.object({
    name: z.string(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const ApiGiftCardSchema = z.object({
  _id: z.optional(z.string()),
  code: z.string(),
  status: z.enum(["active", "inactive", "redeemed"]),
  initialValue: z.number(),
  hasExpiry: z.boolean(),
  customer: z.string(),
  internalNotes: z.optional(z.string()),
  expiresAt: z.optional(z.date()),
  createdBy: z.object({
    name: z.string(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type GiftCard = z.infer<typeof GiftCardSchema>;
type ApiGiftCard = z.infer<typeof ApiGiftCardSchema>;

export { type GiftCard, GiftCardSchema, ApiGiftCardSchema, type ApiGiftCard };
