const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Price extends Model {}

Price.init(
  {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      references: {
        model: "customer",
        key: "id",
      },
    },
    item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
      references: {
        model: "item",
        key: "id",
      },
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "price",
  }
);

module.exports = Price;
