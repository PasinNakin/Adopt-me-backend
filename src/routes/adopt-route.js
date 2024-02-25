const express = require("express");
const adoptController = require("../controllers/adopt-controller");
const router = express.Router();

router.post("/create", adoptController.createAdopt);
router.get("/getAdopt", adoptController.findUserAdopt);
// router.patch("/approve");
router.delete("/cancel/:dogId", adoptController.cancelAdopt);
module.exports = router;
