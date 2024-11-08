import { DataTypes } from 'sequelize'
import sequelize from './sequelize.js'
import { servicesClientsModel } from './services-clients.js';

/*
idServicio
descripcion
precio 
*/


export const serviceModel = sequelize.define(
  'Servicio',
  {
    id_servicios: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    desc_servicio: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    /*
        yo agregaria algun otro como duracion, tipo (onda si es un service, reemplazo de componentes, arreglo, etc),
    si hay algun extra como comprar algo aparte o algo asi.

    */
  },
  {
    tableName: 'servicios',
    timestamps: false,
  })

serviceModel.hasMany(servicesClientsModel, { foreignKey: "id_servicio", onDelete: "CASCADE" });
servicesClientsModel.belongsTo(serviceModel, { foreignKey: "id_servicio", onDelete: "CASCADE" });