import { z } from "zod"

const ApiGiftCardSchema = z.object({
  code: z.string().min(1, "Code is required"),
  status: z.enum(["active", "inactive", "redeemed"]),
  initialValue: z.number(),
  hasExpiry: z.boolean(),
  customer: z.string(),
  internalNotes: z.optional(z.string()),
  expiresAt: z.optional(z.string()),
  createdBy: z.object({
    name: z.string(),
  }),
  createdAt: z.optional(z.string()),
  updatedAt: z.optional(z.string()),
});

type ApiGiftCard = z.infer<typeof ApiGiftCardSchema>;

type GiftCard = Omit<Omit<ApiGiftCard, "createdAt">, "updatedAt"> & {
  _id: string; createdAt: string; updatedAt: string;
};

export { type GiftCard, ApiGiftCardSchema, type ApiGiftCard };
