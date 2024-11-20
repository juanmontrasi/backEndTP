import { DataTypes } from 'sequelize';
import { productModel } from './products.js';
import { orderModel } from './orders.js';
import sequelize from './sequelize.js';

export const orderProductsModel = sequelize.define(
  'productos_pedidos',
  {
    id_pedidos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }

  },
  {
    timestamps: false,
  }
);

orderModel.hasMany(orderProductsModel, { foreignKey: 'id_pedidos' });
orderProductsModel.belongsTo(orderModel, { foreignKey: 'id_pedidos' });

orderProductsModel.belongsTo(productModel, { foreignKey: 'id_producto' });
productModel.hasMany(orderProductsModel, { foreignKey: 'id_producto' });