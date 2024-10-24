const prisma = require("../models/prisma");

exports.findUserByEmail = (emailOrMobile) =>
    prisma.user.findFirst({
        where: {
            OR: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
        },
    });

exports.createUser = (data) => prisma.user.create({ data });

exports.findUserById = (id) => prisma.user.findUnique({ where: { id } });

exports.editUserById = (id, data) =>
    prisma.user.update({ data, where: { id } });
