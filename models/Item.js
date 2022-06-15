const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../config/connection");

class Item extends Model {}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "item",
  }
);

module.exports = Item;
