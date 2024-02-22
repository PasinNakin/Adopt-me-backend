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

router.get("/getDogBreed", dogController.getDogBreed);
router.get("/allDog", dogController.getAllDog);
router.get("/profile/:dogId", dogController.getDogById);
router.get("/search", dogController.searchDog);

router.patch("/update/:dogId", dogController.updateDogById);
router.delete("/deleteDog/:dogId", dogController.deleteDogById);

module.exports = router;
