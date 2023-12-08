import { z } from "zod";
import { Product } from "./product";

const OrderSchema = z.object({  
    _id: z.string(),
    customer: z.string(),
})