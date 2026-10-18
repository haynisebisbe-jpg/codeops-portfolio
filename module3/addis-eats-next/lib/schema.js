import { z } from "zod";

const orderItemSchema = z.object({
  dishId: z.string().min(1, "Select a valid dish"),
  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(99, "Quantity cannot exceed 99"),
});

export const orderSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters"),

  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(
      /^(09|\+2519)\d{8}$/,
      "Phone number must start with 09 or +2519 followed by 8 digits"
    ),

  items: z
    .array(orderItemSchema)
    .min(1, "Your cart must contain at least one dish")
    .max(20, "You cannot order more than 20 different dishes"),

  notes: z
    .string()
    .max(200, "Notes cannot exceed 200 characters")
    .optional(),
});