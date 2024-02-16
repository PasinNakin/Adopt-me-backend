const Joi = require("joi");
const validate = require("./validator");

const age = ["PUPPY", "ADULT", "SENIOR"];
const gender = ["MALE", "FEMALE"];

const createDogSchema = Joi.object({
    name: Joi.string().required().trim().messages({
        "string.empty": "name is required",
        "any.required": "name is required",
    }),

    age: Joi.string()
        .valid(...age)
        .required()
        .trim()
        .messages({
            "string.empty": "age is required",
            "any.only": "Wrong type of age",
            "any.required": "age is required",
        }),

    breedId: Joi.number().required().messages({
        "string.empty": "Breed is required",
        "any.required": "Breed is required",
    }),

    gender: Joi.string()
        .valid(...gender)
        .required()
        .trim()
        .messages({
            "string.empty": "Gender is required",
            "any.only": "Wrong type of Gender",
            "any.required": "Gender is required",
        }),

    // profileImage: Joi.string().required().messages({
    //     "string.empty": "Image is required",
    //     "any.required": "Image is required",
    // }),

    description: Joi.string().optional(),
});

exports.validateCreateDog = validate(createDogSchema);
