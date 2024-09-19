import { validatePartialproducts, validateproducts } from "../schemas/productss.js"


export class productsController {
  constructor({ productsModel }) {
    this.productsModel = productsModel
  }

  getAllproductss = async (req, res) => {
    const productss = await this.productsModel.findAll()
    if (productss.length > 0) {
      res.json(productss)
    } else {
      res.status(404).send({ message: 'no productss available' })
    }
  }

  getproductsById = async (req, res) => {
    const { id } = req.params
    const products = await this.productsModel.findAll({
      where: {
        id_products: id,
      },
    })
    if (products) return res.json(products)
    res.status(404).json({ message: 'products not found' })
  }

  createproducts = async (req, res) => {
    console.log(req.body)
    const result = validateproducts(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newproducts = await this.productsModel.create({
      products_name: result.data.products_name,
      products_description: result.data.products_description,
      products_price: result.data.products_price,
      isConsumable: result.data.isConsumable,
      category: result.data.category,
      range: result.data.range,
    })
    res.status(201).json(newproducts)
  }

  deleteproductsById = async (req, res) => {
    const { id } = req.params
    const products = await this.productsModel.destroy({
      where: {
        id_products: id,
      },
    })
    if (products) {
      res.json({ message: 'products deleted succesfully' }) // puedo devolver el products tambien
    } else {
      res.status(404).send({ message: 'products not found' })
    }
  }

  modifyproducts = async (req, res) => {
    const result = validatePartialproducts(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const [updatedproducts] = await this.productsModel.update(
      {
      products_name: result.data.products_name,
      products_description: result.data.products_description,
      products_price: result.data.products_price,
      isConsumable: result.data.isConsumable,
      category: result.data.category,
      range: result.data.range,
      },
      {
        where: {
          id_products: id,
        },
      }
    )
    if (updatedproducts === 0) {
      return res.status(404).json({ message: 'products not found' });
    }
    res.json({ message: 'products updated succesfully' }) // puedo devolver el products

  }

  
  }



