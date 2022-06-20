const router = require("express").Router();
const {Invoice, Invoice_items}= require("../../models")

// get routes for debugging purposes

router.get('/', async (req, res) => {

})

router.get('/:id', async (req, res) => {

})


// add new order
router.post('/', async (req, res) => {
	
})


// update order
router.put('/:id', async (req, res) => {

})

// delete order

router.delete('/:id', async (req, res) => {
	
})



module.exports = router