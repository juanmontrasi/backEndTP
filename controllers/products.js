import { Op } from "sequelize"
import { validatePartialProduct, validateProduct } from "../schemas/products.js"

export class ProductController {
  constructor({ productModel }) {
    this.productModel = productModel
  }

  getAllProducts = async (req, res) => {
    const products = await this.productModel.findAll()
    if (products.length > 0) {
      res.json(products)
    } else {
      res.status(404).send({ message: 'No hay productos disponibles' })
    }
  }


  getProductById = async (req, res) => {
    const { id } = req.params
    const product = await this.productModel.findAll({
      where: {
        id_productos: id,
      },
    })
    if (product) return res.json(product)
    res.status(404).json({ message: 'Producto no encontrado' })
  }

  createProduct = async (req, res) => {
    console.log(req.body)
    const result = validateProduct(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    try{
      const newProduct = await this.productModel.create({
        nombre_producto: result.data.nombre_producto,  //agregada
        desc_producto: result.data.desc_producto,
        precio: result.data.precio,
        stock: result.data.stock,
        imagen: result.data.imagen
      })
      res.status(201).json(newProduct)
    }catch{
      res.status(400).send({ error: JSON.parse(result.error.message) })
    }
    
  }

  deleteProductById = async (req, res) => {
    const { id } = req.params
    const product = await this.productModel.destroy({
      where: {
        id_productos: id,
      },
    })
    if (product) {
      res.json({ message: 'Producto eliminado exitosamente' })
    } else {
      res.status(404).send({ message: 'Producto no encontrado' })
    }
  }

  modifyProduct = async (req, res) => {
    const result = validatePartialProduct(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    if(req.body.stock <= 0){
      return res.status(400).json({ error: 'El stock no puede ser menor o igual a 0' })
    }else{ 
      const [updatedProduct] = await this.productModel.update(
        {
          nombre_producto: result.data.nombre_producto,
          desc_producto: result.data.desc_producto,
          precio: result.data.precio,
          stock: result.data.stock,
          imagen: result.data.imagen
        },
        {
          where: {
            id_productos: id,
          },
        }
      )
      if (updatedProduct === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json({ message: 'Producto actualizado exitosamente' })
    }
    

  }

  getProductByName = async (req, res) => {
    const { nombre_producto } = req.query
    try {
      const productos = await this.productModel.findAll({
        where: {
          nombre_producto: {
            [Op.like]: `%${nombre_producto}%`
          },
        },
      })
      res.json(productos)
    } catch (error) {
      res.status(500).send('Error al buscar el producto')
    }

  }
}