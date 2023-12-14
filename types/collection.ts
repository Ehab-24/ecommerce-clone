import { z } from "zod";

export enum Operator {
  Equals = "equals",
  NotEquals = "not-equals",
  GreaterThan = "greater-than",
  LessThan = "less-than",
  Contains = "contains",
  NotContains = "not-contains",
  StartsWith = "starts-with",
  EndsWith = "ends-with",
}

const ConditionSchema = z.object({
  field: z.string(),
  operator: z.nativeEnum(Operator),
  value: z.union([z.string(), z.number()]),
});

const ApiCollectionSchema = z.object({
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
  includeInOnlineStore: z.boolean(),
  createdAt: z.optional(z.string()),
  updatedAt: z.optional(z.string()),
});

type ApiCollection = z.infer<typeof ApiCollectionSchema>;
type Condition = z.infer<typeof ConditionSchema>;

type Collection = Omit<
  Omit<Omit<ApiCollection, "createdAt">, "updatedAt">,
  "products"
> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  products: string[];
};

export {
  ApiCollectionSchema,
  ConditionSchema,
  type ApiCollection,
  type Collection,
  type Condition,
};
