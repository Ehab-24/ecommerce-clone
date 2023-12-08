import { z } from "zod"

const GiftCardSchema = z.object({
  _id: z.optional(z.string()),
  code: z.string(),
  status: z.enum(["active", "inactive", "redeemed"]),
  initialValue: z.number(),
  hasExpiry: z.boolean(),
  customer: z.string(),
  internalNotes: z.optional(z.string()),
  expiresAt: z.optional(z.date()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type GiftCard = z.infer<typeof GiftCardSchema>;

export { type GiftCard, GiftCardSchema };
