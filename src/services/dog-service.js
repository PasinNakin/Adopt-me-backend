const prisma = require("../models/prisma");

exports.createDog = (data) => prisma.dog.create({ data });
