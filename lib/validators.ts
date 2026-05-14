import { z } from "zod";

export const authSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const addressSchema = z.object({
  fullName: z.string().min(2),
  line1: z.string().min(3),
  city: z.string().min(2),
  country: z.string().min(2),
  postalCode: z.string().min(3),
});

export const checkoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
      unitAmount: z.number().positive(),
      name: z.string().min(1),
    })
  ),
  email: z.string().email(),
});
