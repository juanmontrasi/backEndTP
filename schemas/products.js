import { z } from "zod"

const productSchema = z.object({    // define como una plantilla que tiene que seguir los body de los posts/patch que lleguen
  
    nombre_producto: z.string({
    invalid_type_error: 'Nombre de Producto debe ser texto',
    required_error: 'Nombre de Producto requerido'
  }),

    desc_producto: z.string({
    invalid_type_error: 'Descripción de Producto debe ser texto',
    required_error: 'Descripción de Producto requerido'
  }),

  precio: z.number({
    invalid_type_error: 'Precio de Producto debe ser numero',
    required_error: 'Precio de Producto requerido'
  }),

  stock: z.number({
    invalid_type_error: 'Stock de Producto debe ser texto',
    required_error: 'Stock de Producto requerido'
  }),

  

})

export function validateProduct(input) {
  return productSchema.safeParse(input)
}

export function validatePartialProduct(input) {
  return productSchema.partial().safeParse(input)
}
