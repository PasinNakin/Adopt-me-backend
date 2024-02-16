const prisma = require("../models/prisma");

const breedSeed = [
    { dogBreed: "Other" },
    { dogBreed: "Chihuahua" },
    { dogBreed: "Labrador Retriever" },
    { dogBreed: "Golden Retriever" },
    { dogBreed: "Siberian husky" },
    { dogBreed: "Corgi" },
    { dogBreed: "Beagle" },
    { dogBreed: "Shiba Inu" },
    { dogBreed: "German Shepherd" },
    { dogBreed: "Shih Tzu" },
    { dogBreed: "Poodle" },
];

async function run() {
    await prisma.breed.createMany({ data: breedSeed });
}

run();
