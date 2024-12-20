const prisma = require("../models/prisma");

exports.createDog = (data) => prisma.dog.create({ data });

exports.getDogBreed = () =>
    prisma.breed.findMany({
        orderBy: {
            dogBreed: "asc",
        },
    });

exports.findAdoptedDog = () =>
    prisma.dog.findMany({
        where: {
            status: "ADOPTED",
        },
    });

exports.findDogWithBreed = () =>
    prisma.dog.findMany({
        where: {
            status: {
                not: "ADOPTED",
            },
        },
        include: {
            breed: true,
        },
    });

exports.findDogRequest = () =>
    prisma.dog.findMany({
        where: { status: "PENDING" },
    });
exports.findDogExample = () =>
    prisma.dog.findMany({
        where: {
            status: "AVAILABLE",
        },
        take: 4,
    });

exports.findDogWithPagination = (currentPage, PER_PAGE) => {
    return prisma.dog.findMany({
        where: {
            status: {
                not: "ADOPTED",
            },
        },
        take: PER_PAGE,
        skip: (currentPage - 1) * PER_PAGE,
    });
};

exports.upDateDogById = (data, id) =>
    prisma.dog.update({ data, where: { id }, include: { breed: true } });

exports.findDogById = (id) =>
    prisma.dog.findUnique({ where: { id }, include: { breed: true } });

exports.deleteDogById = (id) => prisma.dog.delete({ where: { id } });

exports.searchingDog = (searchData) => {
    const { age, gender, breedId } = searchData;
    const query = [];
    if (age) query.push({ age });
    if (gender) query.push({ gender });
    if (breedId) query.push({ breedId: +breedId });

    return prisma.dog.findMany({
        where: {
            status: {
                not: "ADOPTED",
            },
            AND: [...query],
        },
    });
};

exports.acceptToAdopted = (id, data) =>
    prisma.dog.update({ data, where: { id } });

exports.updateStatus = (dogId, data) =>
    prisma.dog.update({ data, where: { id: dogId } });

exports.findRelationship = (id) =>
    prisma.dog.findFirst({
        where: { id },
        select: {
            id: true,
            name: true,
            status: true,
            adopt: { select: { id: true, userId: true, dogId: true } },
        },
    });
