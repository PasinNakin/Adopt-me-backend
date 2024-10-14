const prisma = require("../models/prisma");

exports.createAdopt = (data) => {
    console.log(data);
    return prisma.adopt.create({ data });
};

exports.deleteAdopt = (dogId) => prisma.adopt.delete({ where: { dogId } });
exports.findAdoptByDogId = (dogId) =>
    prisma.adopt.findFirst({ where: { dogId } });

exports.checkExistAdopt = (dogId) =>
    prisma.adopt.findFirst({
        where: { dogId },
    });

const userfilter = { id: true, firstName: true, role: true };
const dogfilter = {
    id: true,
    status: true,
    name: true,
    age: true,
    profileImage: true,
    gender: true,
    description: true,
};

exports.findAdoptByUserId = (userId) =>
    prisma.adopt.findMany({
        where: { userId },
        include: {
            user: { select: userfilter },
            dog: {
                select: {
                    ...dogfilter,
                    breed: {
                        select: {
                            id: true,
                            dogBreed: true,
                        },
                    },
                },
            },
        },
    });
