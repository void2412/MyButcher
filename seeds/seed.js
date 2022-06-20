const sequelize = require('../config/connection')

const {Customer, Invoice, Invoice_items, Item, Price} = require('../models')

const customerSeed = require('./customer.json')
const itemSeed = require('./item.json')

const seedDb = async ()=>{
	await sequelize.sync({force: true})
	const customer = await Customer.bulkCreate(customerSeed,{
		individualHooks:true,
		returning: true
	})
}