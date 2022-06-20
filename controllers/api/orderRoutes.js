const router = require("express").Router();
const {Customer, Invoice, Invoice_items}= require("../../models")

// get routes for debugging purposes

router.get('/', async (req, res) => {
	const invoiceData = await Invoice.findAll({
		include:{model: Invoice_items}
	})
	const invoice = invoiceData.map((inv)=>inv.get({plain:true}))
	res.json(invoice)
})

router.get('/:id', async (req, res) => {
	const invoiceData = await Invoice.findByPk(req.params.id,{
		include:{model: Invoice_items}
	})
	const invoice = invoiceData.get({plain:true})
	res.json(invoice)
})


// add new order
router.post('/', async (req, res) => {
	try{
		const userData = await Customer.findByPk(req.session.customer_id,{
			attributes:{exclude:['password']}
		})

		// check admin and set object based on admin status
		if (userData.checkAdmin()){
			const object = {
				customer_id:req.session.customer_id,
				customer_name: userData.name,
				customer_email: userData.email,
				address: userData.address,
				phone1: userData.phone1,
				phone2: userData.phone2,
				due_date: req.body.due_date,
				note: req.body.note,
				approve: false
			}
		}
		else{
			const object = {
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

		const newInvoice = await Invoice.create(object)

		res.status(200).json(newInvoice)
	}
	catch (err){
		res.status(400).json(err)
	}
})


// update order
router.put('/:id', async (req, res) => {

})

// delete order

router.delete('/:id', async (req, res) => {

})



module.exports = router