const router = require("express").Router();
const { Item, Price, Customer, Invoice, Invoice_items } = require("../models");
const withAuth = require("../utils/auth");
const getDocumentData = require("../utils/pdfMaker")
const {getItemTotal} = require("../utils/helpers")

router.get("/", async (req, res) => {
  try {
    if (req.session.customer_id) {
      res.redirect("/userprofile");
      return;
    }
    res.render("homepage");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get dashboard when user login

router.get("/userprofile", withAuth, async (req, res) => {
  try {
    // find the logged in customer based on the session id
    const customerData = await Customer.findByPk(req.session.customer_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Invoice }],
    });

    const customer = customerData.get({ plain: true });
    console.log(customer);

    res.render("userprofile", {
      customer,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// add edit user route
router.get("/edit-profile/:id", withAuth, async (req, res) => {
  try {
    const customerData = await Customer.findByPk(req.params.id);

    const customer = customerData.get({ plain: true });
    console.log(customer);

    res.render("edituser", { customer, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// add order routes

router.get("/orders", withAuth, async (req, res) => {
  try {
    if (!req.session.customer_id) {
      res.status(401).send("Unauthorized");
      return;
    }
    const priceData = await Price.findAll({
      where: {
        customer_id: req.session.customer_id,
      },
    });
    const price = priceData.map((inv) => inv.get({ plain: true }));

    for (let item of price) {
      const itemData = await Item.findByPk(item.item_id);
      item.tax_rate = itemData.tax_rate;
      item.item_name = itemData.name;
    }

    res.render("orders", {
      logged_in: true,
      price,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get invoice details by it's id

router.get("/invoice/:id", withAuth, async (req, res) => {
  try {

    const invoiceData = await Invoice.findByPk(req.params.id);
	
	if (invoiceData.customer_id != req.session.customer_id) {
		res.status(401).redirect('/')
		return
	}

    const invoice = invoiceData.get({ plain: true });
    

    const invoiceItemsData = await Invoice_items.findAll({
      where: {
        invoice_id: req.params.id,
      },
	  include:[{model: Item}]
    });
    const invoiceItems = invoiceItemsData.map((inv) =>
      inv.get({ plain: true })
    );

	let total =0
	for (const item of invoiceItems) {
		let itemTotal = getItemTotal(item.unit_price, item.quantity, item.discount)
		total += itemTotal
	}


    res.render("invoice", { invoice, invoiceItems, logged_in: true, total: total });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get pdf file by invoice id
router.post("/invoice/pdf/:id", withAuth, async (req, res)=>{
	try{
		const invoiceData = await Invoice.findByPk(req.params.id,{
			include:[{model: Invoice_items, include:[{model: Item, attributes:['name']}]}]
		})
		
		if(req.session.customer_id != invoiceData.customer_id){
			res.status(401).json({message:'Unauthorized'})
			return
		}

		const plainInvoiceData = invoiceData.get({plain:true})
		delete plainInvoiceData.customer_id
		
		var file = getDocumentData(plainInvoiceData)
		res.status(200).send(file)
	}
	catch (err) {
		res.status(500).json(err)
	}
})


// add login route

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/userprofile");
    return;
  }

  res.render("homepage");
});



module.exports = router;
