import { DataTypes } from 'sequelize'
import sequelize from './sequelize.js'
import { orderModel } from './orders.js'


export const userModel = sequelize.define(
  'Usuario',
  {
    id_usuarios: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clave: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'usuarios',
    timestamps: false,
  }
)

userModel.hasMany(orderModel, { foreignKey: 'id_cliente' })
orderModel.belongsTo(userModel, {
  foreignKey: 'id_cliente',
  onDelete: 'CASCADE',
})