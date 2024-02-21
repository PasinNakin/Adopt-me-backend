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
    prisma.dog.update({ data, where: { id } });

exports.findDogById = (id) =>
    prisma.dog.findUnique({ where: { id }, include: { breed: true } });

exports.deleteDogById = (id) => prisma.dog.delete({ where: { id } });
