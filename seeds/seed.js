const sequelize = require('../config/connection')

const {Customer, Invoice, Invoice_items, Item, Price} = require('../models')

const customerSeed = require('./customer.json')
const itemSeed = require('./item.json')


const checkExist = (array, key, value)=>{
	for(const object of array){
		if (object[key] == value){
			return true
		}
	}
	return false
}


const seedDb = async ()=>{
	await sequelize.sync({force: true})
	const customer = await Customer.bulkCreate(customerSeed,{
		individualHooks:true
	})
	const item = await Item.bulkCreate(itemSeed,{
	})

	let priceList=[]
	for (const user of customer){
		if(user.account_type != 0){
			let amountOfItem = Math.floor(Math.random()*(item.length-1) + 1)
			let usedItem =[]
			for (let i=0; i<amountOfItem; i++){
	
				let itemId = Math.floor(Math.random()*(item.length-1) + 1)

				while(usedItem.includes(itemId)){
					itemId = Math.floor(Math.random()*(item.length-1) + 1)
					console.log('duplicate')
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
	console.log('Adding price to db')
	const price = await Price.bulkCreate(priceList,{
	})
	console.log('Finished adding price')

	let invoiceList=[]
	for (let i=0; i<20;i++){
		let userId = Math.floor(Math.random()*(customer.length -1) + 1)
		
		while(!checkExist(price, 'customerId', userId)){
			userId = Math.floor(Math.random()*(customer.length -1) + 1)
			while(customer[userId].account_type == 0){
				userId = Math.floor(Math.random()*(customer.length -1) + 1)
			}
		}
		
		

		let object = {
			customer_id: userId,
			customer_name: customer[userId].name,
			customer_email: customer[userId].email,
			address: customer[userId].address,
			phone1: customer[userId].phone1,
			phone2: customer[userId].phone2,
			due_date: Date.now(),
			approve: false
		}

		invoiceList.push(object)
	}

	console.log('Adding invoice to db')
	const invoice = await Invoice.bulkCreate(invoiceList, {
		returning: true
	})
	console.log('Finish adding invoice to db')

	const invoiceItemList = []
	for (let i = 0; i < 100; i++){
		let invoiceId = Math.floor(Math.random() * (invoice.length -1) + 1)
		let customerId = invoice[invoiceId-1].customer_id
		let itemIdList =[]
		for (const y of price){
			if (y.customerId == customerId && !itemIdList.includes(y.itemId)){
				itemIdList.push(y.itemId)
			}
		}
		if(itemIdList.length <= 0){
			console.error("item Id List empty")
			return
		}
			
		let itemId =itemIdList[Math.floor(Math.random() * (itemIdList.length - 1) + 1)]


		let unit_price

		for(const x of price){
			if(x.customerId == customerId && x.itemId == itemId){
				unit_price = x.unit_price
			}
		}
		
		let object = {
			"invoice_id": invoiceId,
			"item_id": itemId,
			"quantity": Math.floor(Math.random() * 95 + 5),
			"unit_price": unit_price,
			"tax_rate": 0,
			"discount": Math.floor(Math.random() * 14 + 1)
		}
		invoiceItemList.push(object)
	}

	console.log('Adding invoice items to db')
	const invoiceItems = await Invoice_items.bulkCreate(invoiceItemList, {
		returning: true
	})
	console.log('Finish adding invoice items to db')
}

seedDb()