import { z } from "zod"

const orderSchema = z.object({
  fecha_pedido: z.string({
    invalid_type_error: 'Fecha del pedido debe ser un string',
    required_error: 'Fecha del pedido requerido'
  }),

  total: z.number({
    invalid_type_error: 'Total del pedido debe ser numero',
    required_error: 'Total del pedido requerido'
  }),

  id_cliente: z.number({
    invalid_type_error: 'Id del cliente debe ser numero',
    required_error: 'Id del cliente requerido'
  }),

  estado: z.string({
    invalid_type_error: 'Estado del pedido debe ser texto',
    required_error: 'Estado del pedido requerido'
  }),
  estado_pago: z.string({
    invalid_type_error: 'Estado del pago debe ser texto',
    required_error: 'Estado del pago requerido'
  }),

})

export function validateOrder(input) {
  return orderSchema.safeParse(input)
}

export function validatePartialOrder(input) {
  return orderSchema.partial().safeParse(input)
}
