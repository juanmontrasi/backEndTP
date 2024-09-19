import { z } from "zod"

const productsSchema = z.object({
  name: z.string({
    invalid_type_error: 'Products name must be a string',
    required_error: 'name required'
  }),
  description: z.string({
    invalid_type_error: 'Description must be a string',
    required_error: 'description required'
  }),
  price: z.number().float({
    invalid_type_error: 'Products price must be a float',
    required_error: 'Price required'
  }),
  isConsumable: z.boolean({
    invalid_type_error: 'Products has to be categorized as consumable or not with a boolean value',
    required_error: 'Boolean required'
  }),
  category: z.string({
    invalid_type_error: 'Products category must be a string',
    required_error: 'Category required'
  }),
  range: z.string({
    invalid_type_error: 'Range must be a string',
    required_error: 'Range required'
  })
})


export function validateproducts(input) {
  return productsSchema.safeParse(input)
}

export function validatePartialproducts(input) {
  return productsSchema.partial().safeParse(input)
}
