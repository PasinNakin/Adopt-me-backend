const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const adoptService = require("../services/adopt-service");
const dogService = require("../services/dog-service");

exports.createAdopt = catchError(async (req, res, next) => {
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

exports.findUserAdopt = catchError(async (req, res, next) => {
    const data = await adoptService.findAdoptByUserId(req.user.id);

    res.status(200).json({ data });
});

exports.cancelAdopt = catchError(async (req, res, next) => {
    const adopt = await adoptService.findAdoptByDogId(+req.params.dogId);
    if (req.user.role === "ADMIN" || req.user.id === adopt.userId) {
        const data = await adoptService.deleteAdopt(+req.params.dogId);
        await dogService.updateStatus(data.dogId, { status: "AVAILABLE" });
        res.status(200).json({ data });
    }
});
