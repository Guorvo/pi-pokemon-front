const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define('types', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING
		}
	},
		{ timestamps: false });
}
DataTypes




// [ ] Tipo con las siguientes propiedades:
// ID
// Nombre