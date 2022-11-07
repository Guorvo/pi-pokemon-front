const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      max: 255,
      min: 1
    },
    attack: {
      type: DataTypes.INTEGER,
      max: 255,
      min: 1
    },
    defense: {
      type: DataTypes.INTEGER,
      max: 255,
      min: 1
    },
    speed: {
      type: DataTypes.INTEGER,
      max: 255,
      min: 1
    },
    height: {
      type: DataTypes.INTEGER,
    },
    weight: {
      type: DataTypes.INTEGER,
    }
  },
    { timestamps: false });
};

// [ ] Pokemon con las siguientes propiedades:
// ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
// Nombre *
// Vida
// Ataque
// Defensa
// Velocidad
// Altura
// Peso