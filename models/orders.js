import { DataTypes } from 'sequelize'
import sequelize from './sequelize.js'

export const orderModel = sequelize.define(
  'pedidos',
  {
    id_pedidos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
    total: {
      type: DataTypes.DECIMAL(9, 3),
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: false,
  }
)