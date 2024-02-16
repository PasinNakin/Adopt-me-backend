const express = require("express");
const dogController = require("../controllers/dog-controller");
const { validateCreateDog } = require("../middlewares/validator/validate-dog");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post(
    "/createProfile",
    upload.single("profileImage"),
    validateCreateDog,
    dogController.createDog
);

module.exports = router;
