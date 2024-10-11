import { z } from "zod"

const orderProductSchema = z.object({
    cantidad: z.number({
    invalid_type_error: 'La cantidad debe ser numero',
    required_error: 'La cantidad es un campo requerido'
  })

})

export function validateProduct(input) {
  return orderProductSchema.safeParse(input)
}

export function validatePartialProduct(input) {
  return orderProductSchema.partial().safeParse(input)
}