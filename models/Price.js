const { Model, DataTypes } = require("sequelize");

const sequelize = require("sequelize");

class Price extends Model {}

Price.init(
	{
		customer_id:{
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true
		},
		item_id : {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: false
		},
		unit_price: {
			type: DataTypes.DECIMAL(10,2),
			allowNull: false
		}
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "price"
	}
)
