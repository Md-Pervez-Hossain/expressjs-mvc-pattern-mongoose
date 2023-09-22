const express = require("express");
const productControler = require("../../../controlers/productControlers");

const router = express.Router();
router.route("/bulk-update").patch(productControler.bulkUpdateProduct);
router.route("/bulk-delete").delete(productControler.bulkDeleteProduct);
router
  .route("/")
  .get(productControler.getAllProduct)
  .post(productControler.saveAProduct);

router
  .route("/:id")
  .patch(productControler.updateProduct)
  .delete(productControler.DeleteProduct);
module.exports = router;
