import { z } from "zod";

export enum Operator {
  Equals = "equals",
  NotEquals = "not-equals",
  GreaterThan = "greater-than",
  LessThan = "less-than",
  Contains = "contains",
  NotContains = "not-contains",
  StartsWith = "starts-with",
  EndsWith = "ends-with"
}

export const ConditionSchema = z.object({
  field: z.string(),
  operator: z.nativeEnum(Operator),
  value: z.union([z.string(), z.number()]),
})

export const CollectionSchema = z.object({
  _id: z.optional(z.string()),
  title: z.string(),
  description: z.string(),
  image: z.optional(z.string()),
  collectionType: z.enum(["automated", "manual"]),
  conditions: z.array(ConditionSchema),
  conditionsMatch: z.enum(["all", "any"]),
  products: z.optional(z.number()),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
  createdAt: z.optional(z.date()),
  updatedAt: z.optional(z.date()),
});

export type Collection = z.infer<typeof CollectionSchema>;
export type Condition = z.infer<typeof ConditionSchema>;
