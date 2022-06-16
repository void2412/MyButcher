const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Customer extends Model {}

Customer.init(
	{
		user_name: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		phone1: {
			type: DataTypes.STRING(15),
			allowNull: true
		},
		phone2: {
			type: DataTypes.STRING(15),
			allowNull: true
		}

	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'customer'
	}
)

module.exports = Customer