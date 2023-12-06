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
  value: z.string()
})

export const CollectionSchema = z.object({
  _id: z.optional(z.string()),
  title: z.string(),
  description: z.string(),
  image: z.optional(z.string()),
  collectionType: z.enum(["automated", "manual"]),
  conditions: z.array(ConditionSchema),
  conditionsMatch: z.enum(["all", "any"]),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  })
});

export type Collection = z.infer<typeof CollectionSchema>;
export type Condition = z.infer<typeof ConditionSchema>;
