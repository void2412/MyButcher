const router = require("express").Router();

const customerRoutes = require("./customerRoutes");
const orderRoutes = require("./orderRoutes");

router.use("/customers", customerRoutes);
router.use("/orders", orderRoutes);

module.exports = router;
