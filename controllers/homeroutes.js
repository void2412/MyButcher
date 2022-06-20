const router = require("express").Router();
const { Item, Price, Customer } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
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
      include: [{ model: Item }],
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

// add login route

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/userprofile");
    return;
  }

  res.render("login");
});

// add logout route

router.get("/logout", (req, res) => {
  res.redirect("/");
});
module.exports = router;
