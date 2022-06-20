const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../config/connection");

class Customer extends Model {
	checkPassword(loginPw){
		return bcrypt.compareSync(loginPw, this.password)
	}
}

Customer.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
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
		hooks: {
			beforeCreate: async (newUserData) =>{
				// gen salt for randomness
				const salt = await bcrypt.genSalt()
				newUserData.password = await bcrypt.hash(newUserData.password, salt)
			},
			beforeUpdate: async (updateUserData) =>{
				const salt = await bcrypt.genSalt()
				updateUserData.password = await bcrypt.hash(updateUserData.password, salt)
			}
		},
		sequelize,
		timestamps: true,
		freezeTableName: true,
        underscored: true,
		modelName:'user'
	}
	)
module.exports = Customer;
