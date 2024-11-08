import { DataTypes } from 'sequelize'
import sequelize from './sequelize.js'

export const productModel = sequelize.define(
  'Producto',
  {
    id_productos: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nombre_producto: {
      type: DataTypes.STRING,
      allowNull: false
    },

    desc_producto: {
      type: DataTypes.STRING,
      allowNull: false
    },

    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    stock: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'productos',
    timestamps: false,
  })