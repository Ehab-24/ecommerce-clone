import { z } from "zod"

const AdjustmentSchema = z.object({
    name: z.string(),
    value: z.number(),
})

type Adjustment = z.infer<typeof AdjustmentSchema>;

export { type Adjustment, AdjustmentSchema }
