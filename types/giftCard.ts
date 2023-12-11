import { z } from "zod"

const ApiGiftCardSchema = z.object({
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

type ApiGiftCard = z.infer<typeof ApiGiftCardSchema>;

type GiftCard = Omit<Omit<ApiGiftCard, "createdAt">, "updatedAt"> & {
  _id: string; createdAt: Date; updatedAt: Date;
};

export { type GiftCard, ApiGiftCardSchema, type ApiGiftCard };
