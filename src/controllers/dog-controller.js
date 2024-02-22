const fs = require("fs/promises");

const catchError = require("../utils/catch-error");
const dogService = require("../services/dog-service");
const uploadService = require("../services/upload-service");

exports.createDog = catchError(async (req, res, next) => {
    if (req.file) {
        req.body.profileImage = await uploadService.upload(req.file.path);
        fs.unlink(req.file.path);
    }

    const newDog = await dogService.createDog(req.body);

    res.status(201).json({ newDog });
});

exports.getDogBreed = catchError(async (req, res, next) => {
    const breed = await dogService.getDogBreed(req.body);

    res.status(201).json({ breed });
});

exports.getAllDog = catchError(async (req, res, next) => {
    const allDogWithBreed = await dogService.findDogWithBreed(req.body);
    res.status(201).json({ allDogWithBreed });
});

exports.getDogById = catchError(async (req, res, next) => {
    const dogWithId = await dogService.findDogById(+req.params.dogId);
    res.status(201).json({ dogWithId });
});

exports.updateDogById = catchError(async (req, res, next) => {
    const data = await dogService.upDateDogById(req.body, +req.params.dogId);
    res.status(200).json(data);
});

exports.deleteDogById = catchError(async (req, res, next) => {
    const deleteDog = await dogService.deleteDogById(+req.params.dogId);
    res.status(200).json(deleteDog);
});

exports.searchDog = catchError(async (req, res, next) => {
    console.log(req.query, "-------------------");
    const searchingDog = await dogService.searchingDog(req.query);
    console.log(searchingDog, "CHECK RESULT");
    res.status(200).json(searchingDog);
});
