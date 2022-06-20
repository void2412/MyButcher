const router = require("express").Router();
const { Customer } = require("../../models");

// sign up customer
router.post("/", async (req, res) => {
  try {
    const customerData = await Customer.create(req.body);

    req.session.save(() => {
      req.session.customer_id = customerData.id;
      req.session.logged_in = true;

      res.status(200).json(customerData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login signed up customer
router.post("/login", async (req, res) => {
  try {
    const customerData = await Customer.findOne({
      where: { email: req.body.email },
    });

    if (!customerData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await customerData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

	const adminCheck = await customerData.checkAdmin()

    req.session.save(() => {
      req.session.customer_id = customerData.id;
      req.session.logged_in = true;
	  req.session.admin = adminCheck
      res.json({
        customer: {
          id: customerData.id,
          name: customerData.name,
          email: customerData.email,
        },
        message: "You are now logged in!",
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logout customer

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
