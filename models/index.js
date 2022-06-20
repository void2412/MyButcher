const Customer = require("./Customer");
const Item = require("./Item");
const Price = require("./Price");
const Invoice = require("./Invoice");
const Invoice_items = require("./Invoice_items");

Customer.belongsToMany(Item, { through: Price });
Item.belongsToMany(Customer, { through: Price });


Invoice.hasMany(Invoice_items,{
	foreignKey: 'invoice_id',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE'
})

Invoice_items.belongsTo(Invoice, {
  foreignKey: "invoice_id",
});

Item.hasMany(Invoice_items,{
	foreignKey: "item_id",
	onDelete: 'RESTRICT',
	onUpdate: 'RESTRICT'
})

Invoice_items.belongsTo(Item, {
	foreignKey: "item_id",
})

module.exports = {Customer, Item, Price, Invoice, Invoice_items}