import z from 'zod'

const serviceClientSchema = z.object({
  id_servicio: z.number({
    invalid_type_error: "El id del servicio tiene que ser un entero.",
    required_error: 'El id del servicio es requerido.'
  }
  ).positive(),
  id_usuario: z.number({
    invalid_type_error: "El id del cliente tiene que ser un entero.",
    required_error: 'El id del cliente es requerido.'
  }).positive(),
  fecha_servicio: z.coerce.date({
    invalid_type_error: "La fecha del servicio tiene que ser una fecha y hora.",
    required_error: 'La fecha del servicio es requerida.'
  }),
  mensaje: z.string().optional().nullable()
})


export function validateServiceClient(serviceClient) {
  return serviceClientSchema.safeParse(serviceClient);
}

export function validatePartialServiceClient(serviceClient) {
  return serviceClientSchema.partial().safeParse(serviceClient);
}