import { z } from "zod"

const serviceSchema = z.object({    // define como una plantilla que tiene que seguir los body de los posts/patch que lleguen
  
  precio: z.number({
    invalid_type_error: 'Precio de Servicio debe ser numero',
    required_error: 'Precio de Servicio requerido'
  }),

  desc_servicio: z.string({
    invalid_type_error: 'Descripción de Servicio debe ser texto',
    required_error: 'Descripción de Servicio requerido'
  }),

})

export function validateService(input) {
  return serviceSchema.safeParse(input)
}

export function validatePartialService(input) {
  return serviceSchema.partial().safeParse(input)
}
