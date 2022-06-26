const router = require("express").Router();
const {Customer, Invoice, Invoice_items, Item, Price} = require("../../models")
const auth = require("../../utils/auth")

// add new order
router.post('/', async (req, res) => {
	try{
		const userData = await Customer.findByPk(req.session.customer_id,{
			attributes:{exclude:['password']}
		})
		// check admin and set object based on admin status
		let object
		if (!userData.checkAdmin()){
			object = {
				customer_id:req.session.customer_id,
				customer_name: userData.name,
				customer_email: userData.email,
				address: userData.address,
				phone1: userData.phone1,
				phone2: userData.phone2,
				due_date: req.body.due_date||null,
				note: req.body.note,
				approve: false
			}
		}
		else{
			object = {
				customer_id:req.session.customer_id,
				customer_name: userData.name,
				customer_email: userData.email,
				address: userData.address,
				phone1: userData.phone1,
				phone2: userData.phone2,
				due_date: req.body.due_date,
				note: req.body.note,
				approve: req.body.approve
			}
		}
		// createing invoice
		const newInvoice = await Invoice.create(object,{returning:true});

		// creating invoice items
		const invoice_items = req.body.invoice_items
		
		for(const item of invoice_items){
			// grabbing data
			let itemData = await Item.findByPk(item.id)
			let itemPrice = await Price.findOne({where:{
				customer_id : req.session.customer_id,
				item_id: item.id
			}})
			// constructing the item object
			const itemObject={
				invoice_id: newInvoice.id,
				item_id: item.id,
				quantity: item.quantity,
				note: item.note,
				unit_price: itemPrice.unit_price,
				tax_rate: itemData.tax_rate,
				discount: itemPrice.discount
			}

			// adding to database
			const newInvoiceItems = await Invoice_items.create(itemObject,{returning:true});

			if(!newInvoiceItems){
				res.status(500).send('An error occurred while creating the invoice')
				return
			}
		}
		
		res.status(200).json(newInvoice)
	}
	catch (err){
		res.status(400).json(err)
		console.error(err)
	}
})


// delete order

router.delete('/:invoice_id', async (req, res) => {
	try{
		const invoiceData = await Invoice.destroy({
			where: {invoice_id: req.params.invoice_id}
		})

		if(!invoiceData){
			res.status(400).json(err)
		}

		res.status(200).json(invoiceData)
	}
	catch(err){
		res.status(400).json(err)
	}
})



module.exports = router