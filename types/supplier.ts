import { z } from "zod";

const SupplierSchema = z.object({
    _id: z.string(),
    name: z.string(),
    company: z.string(),
    address: z.string(),
    country: z.string(),
    apartment: z.string(),
    city: z.string(),
    postalCode: z.string(),
    contactName: z.string(),
    email: z.string(),
    phoneNumber: z.string()
});

type Supplier = z.infer<typeof SupplierSchema>;
export { type Supplier, SupplierSchema }
