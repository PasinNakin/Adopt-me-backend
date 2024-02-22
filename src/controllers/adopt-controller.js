const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const adoptService = require("../services/adopt-service");
const dogService = require("../services/dog-service");

exports.createAdopt = catchError(async (req, res, next) => {
    console.log(req.body, "dodyyyyyyyyyyyyyyyyy");
    console.log(req.user, "Userrrrrrrrrrrrrrrrrr");
    const { dogId } = req.body;
    const { id } = req.user;
    const existAdopt = await adoptService.checkExistAdopt(dogId);
    if (existAdopt) {
        createError("already adopt pending", 400);
    }
    const data = { userId: id, dogId };
    const newAdopt = await adoptService.createAdopt(data);
    await dogService.updateStatus(newAdopt.dogId, { status: "PENDING" });
    res.status(200).json({ newAdopt });
});
