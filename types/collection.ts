import { z } from "zod";
import { ProductSchema } from "./product";

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

const ConditionSchema = z.object({
  field: z.string(),
  operator: z.nativeEnum(Operator),
  value: z.union([z.string(), z.number()]),
})

const CollectionSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.optional(z.string()),
  collectionType: z.enum(["automated", "manual"]),
  conditions: z.array(ConditionSchema),
  conditionsMatch: z.enum(["all", "any"]),
  products: z.array(ProductSchema),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
  createdAt: z.optional(z.date()),
  updatedAt: z.optional(z.date()),
});

const ApiCollectionSchema = z.object({
  _id: z.optional(z.string()),
  title: z.string(),
  description: z.string(),
  image: z.optional(z.string()),
  collectionType: z.enum(["automated", "manual"]),
  conditions: z.array(ConditionSchema),
  conditionsMatch: z.enum(["all", "any"]),
  products: z.array(z.string()),
  seo: z.object({
    title: z.string(),
    description: z.string(),
  }),
  createdAt: z.optional(z.date()),
  updatedAt: z.optional(z.date()),
});

type ApiCollection = z.infer<typeof ApiCollectionSchema>;
type Collection = z.infer<typeof CollectionSchema>;
type Condition = z.infer<typeof ConditionSchema>;

export { ApiCollectionSchema, CollectionSchema, ConditionSchema, type ApiCollection, type Collection, type Condition }
