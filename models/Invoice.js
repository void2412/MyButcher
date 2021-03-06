const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Invoice extends Model {}

Invoice.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
			primaryKey: true,
			autoIncrement: true
        },
		customer_id:{
			type: DataTypes.INTEGER,
			allowNull: true,
			references:{
				model: 'customer',
				key:'id'
			}
		},
		customer_name:{
			type: DataTypes.STRING,
			allowNull: false
		},
		customer_email:{
			type: DataTypes.STRING,
			allowNull: false
		},
        address: {
            type: DataTypes.TEXT,
			allowNull: true
        },
		phone1:{
			type: DataTypes.STRING(15),
			allowNull: true
		},
		phone2: {
			type: DataTypes.STRING(15),
			allowNull: true
		},
        due_date: {
        	type: DataTypes.DATE,
			allowNull: true,
			defaultValue:DataTypes.NOW
        },
        note: {
            type: DataTypes.TEXT,
			allowNull: true
        },
		approve:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'invoice',
      }
);

module.exports = Invoice;
