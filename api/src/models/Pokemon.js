const { DataTypes } = require('sequelize');
// Exporting a function that defines the model
// Later we inject the connection to sequelize
module.exports = (sequelize) => {
  // We define the model
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      validate: {max: 255, min: 1}
    },
    attack: {
      type: DataTypes.INTEGER,
      validate: {max: 255, min: 1}
    },
    defense: {
      type: DataTypes.INTEGER,
      validate: {max: 255, min: 1}
    },
    speed: {
      type: DataTypes.INTEGER,
      validate: {max: 255, min: 1}
    },
    height: {
      type: DataTypes.INTEGER,
      validate: { min: 0}
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {min: 0}
    },
    image: {
      type: DataTypes.STRING(1000),
      isUrl: true,
    },
  },
    { timestamps: false });
};