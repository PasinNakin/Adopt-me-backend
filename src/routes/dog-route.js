const express = require("express");
const dogController = require("../controllers/dog-controller");
const { validateCreateDog } = require("../middlewares/validator/validate-dog");
const upload = require("../middlewares/upload");
const authentiacateAdmin = require("../middlewares/authenticate-admin");
const router = express.Router();

router.post(
    "/createProfile",
    upload.single("profileImage"),
    authentiacateAdmin,
    validateCreateDog,
    dogController.createDog
);

router.get("/getDogBreed", dogController.getDogBreed);
router.get("/allDog", dogController.getAllDog);
router.get("/exampleDog", dogController.getExampleDog);
router.get("/profile/:dogId", dogController.getDogById);
router.get("/search", dogController.searchDog);
router.get("/alldog/:page", dogController.paginationDog);
router.get("/totalPage", dogController.getTotalPage);
router.get("/adoptedDog", dogController.getAdoptedDog);

router.patch(
    "/update/:dogId",
    authentiacateAdmin,
    validateCreateDog,
    dogController.updateDogById
);
router.patch(
    "/acceptAdopt/:dogId",
    authentiacateAdmin,
    dogController.approveAdoptDog
);
router.delete(
    "/deleteDog/:dogId",
    authentiacateAdmin,
    dogController.deleteDogById
);
router.get("/relationship/:dogId", dogController.relationshipDog);
// router.get("/Pagination/:page");
module.exports = router;
