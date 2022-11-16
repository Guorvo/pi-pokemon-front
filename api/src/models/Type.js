const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define('type', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey:true
		}
	},
		{ timestamps: false });
};




// [ ] Tipo con las siguientes propiedades:
// ID
// Nombre