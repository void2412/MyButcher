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
	console.log(customer)
	const item = await Item.bulkCreate(itemSeed,{
		returning: true
	})
	console.log(item)

	let priceList=[]
	for (const user of customer){
		if(user.account_type != 0){
			let amountOfItem = Math.floor(Math.random()*(item.length-1) + 1)
			let usedItem =[]
			for (let i=0; i<amountOfItem; i++){
				let itemId = Math.floor(Math.random()*(item.length-1) + 1)

				while(usedItem.includes(itemId)){
					itemId = Math.floor(Math.random()*(item.length-1) + 1)
				}
				usedItem.push(itemId)
			
				var object ={
					"customer_id": user.id,
					"item_id": item[itemId].id,
					"unit_price": Math.floor(Math.random()*14 + 6)
				}
				priceList.push(object)
			}
		}
		
	}

	const price = await Price.bulkCreate(priceList,{
		returning: true
	})
	console.log(price)

}

seedDb()