const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class InvoiceCustomer extends Model {}

InvoiceCustomer.init(
    {
        invoice_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        customer_id: {
            type: DataTypes.STRING,
            references: {
                model: '',
                key: '',
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'InvoiceCustomer',
      }
);

module.exports = InvoiceCustomer;