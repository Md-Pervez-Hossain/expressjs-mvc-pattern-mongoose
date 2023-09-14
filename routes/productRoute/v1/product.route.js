const express = require("express");
const productControler = require("../../../controlers/productControlers");
const pMiddleware = require("../../../middleware/productMiddleware");

const router = express.Router();

router
  .route("/")
  .get(productControler.getAllProduct)
  .post(productControler.saveAProduct);
router.route("/:id").get(productControler.getSingleProduct);
module.exports = router;
