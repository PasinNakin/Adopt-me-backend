const prisma = require("../models/prisma");

exports.createDog = (data) => prisma.dog.create({ data });

exports.getDogBreed = () => prisma.breed.findMany();

exports.findDogWithBreed = () =>
    prisma.dog.findMany({
        include: {
            breed: true,
        },
    });

exports.upDateDogById = (data, id) =>
    prisma.dog.findUnique({ data, where: { id } });

exports.findDogById = (id) =>
    prisma.dog.findUnique({ where: { id }, include: { breed: true } });
