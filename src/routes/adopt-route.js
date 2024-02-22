const express = require("express");
const adoptController = require("../controllers/adopt-controller");
const router = express.Router();

router.post("/create", adoptController.createAdopt);
router.patch("/approve");
router.delete("/cancel");
module.exports = router;
