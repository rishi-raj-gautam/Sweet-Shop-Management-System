const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const sweetCtrl = require("../controllers/sweet.controller");

// all routes protected by authentication middleware
router.use(auth);

// CREATE
router.post("/", role("admin"), sweetCtrl.createSweet);

// READ
router.get("/", sweetCtrl.getAllSweets);
router.get("/search", sweetCtrl.searchSweets);

// UPDATE
router.put("/:id", role("admin"), sweetCtrl.updateSweet);

// DELETE
router.delete("/:id", role("admin"), sweetCtrl.deleteSweet);

// INVENTORY MANAGEMENT
router.post("/:id/purchase", sweetCtrl.purchaseSweet);
router.post("/:id/restock", role("admin"), sweetCtrl.restockSweet);

module.exports = router;
