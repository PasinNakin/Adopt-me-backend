const prisma = require("../models/prisma");

exports.createAdopt = (data) => {
    console.log(data);
    return prisma.adopt.create({ data });
};

exports.deleteAdopt = (id) => prisma.adopt.delete({ id });

exports.checkExistAdopt = (dogId) =>
    prisma.adopt.findFirst({
        where: { dogId },
    });
