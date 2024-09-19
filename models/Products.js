import { DataTypes } from 'sequelize'
import sequelize from './sequelize.js'

export const productsModel = sequelize.define(
  'Products',
  {
    id_products: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    products_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isConsumable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    products_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products_Range: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'productos',
    timestamps: false,
  }
)

//////no se que es esto //////////////

// userModel.hasMany(servicesClientsModel, { foreignKey: 'id_usuario' });
// servicesClientsModel.belongsTo(userModel, { foreignKey: 'id_usuario' });
// userModel.hasMany(OrdersModel, { foreignKey: 'id_cliente' });
// OrdersModel.belongsTo(userModel, {
//   foreignKey: 'id_cliente',
//   onDelete: 'CASCADE',
// });