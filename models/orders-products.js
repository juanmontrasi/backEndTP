import { Op, Model, DataTypes, NOW } from 'sequelize';
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

  },
  {
    timestamps: false,
  }
);

orderModel.hasMany(orderProductsModel, {
  foreignKey: 'id_pedidos',
});

