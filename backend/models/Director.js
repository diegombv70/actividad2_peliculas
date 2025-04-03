const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Director = sequelize.define(
  "Director",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombres: { type: DataTypes.STRING, allowNull: false, unique: true }, // 👈 Coincide con la DB
    estado: { type: DataTypes.STRING, allowNull: false }, // 👈 SQLite usa TEXT, que es equivalente a STRING en Sequelize
    fecha_creacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    fecha_actualizacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { 
    timestamps: false,
    tableName: "directors", // 👈 Especificamos el nombre correcto de la tabla en la DB
  }
);

module.exports = Director;
