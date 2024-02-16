const fs = require("fs/promises");

const catchError = require("../utils/catch-error");
const dogService = require("../services/dog-service");
const createError = require("../utils/create-error");
const uploadService = require("../services/upload-service");

exports.createDog = catchError(async (req, res, next) => {
    if (req.file) {
        req.body.profileImage = await uploadService.upload(req.file.path);
        fs.unlink(req.file.path);
    }

    const newDog = await dogService.createDog(req.body);

    res.status(201).json({ newDog });
});
