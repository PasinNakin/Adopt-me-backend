const express = require("express");
const adoptController = require("../controllers/adopt-controller");
const authentiacateUser = require("../middlewares/authenticate-user");
const authentiacate = require("../middlewares/authenticate");
const router = express.Router();

router.post("/create", authentiacateUser, adoptController.createAdopt);
router.get("/getAdopt", adoptController.findUserAdopt);
// router.patch("/approve");
router.delete("/cancel/:dogId", authentiacate, adoptController.cancelAdopt);
module.exports = router;
