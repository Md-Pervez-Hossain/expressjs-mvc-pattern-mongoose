const express = require("express");
const productControler = require("../../../controlers/productControlers");

const router = express.Router();

router
  .route("/")
  .get(productControler.getAllProduct)
  .post(productControler.saveAProduct);
router.route("/bulk-update").patch(productControler.bulkUpdateProduct);
router.route("/:id").patch(productControler.updateProduct);
module.exports = router;
