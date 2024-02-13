const Joi = require("joi");

const registerSchema = Joi.object({
    firstName: Joi.string().required().trim().messages({
        "string.empty": "first name is required",
        "any.required": "first name is required",
    }),

    lastName: Joi.string().required().trim().messages({
        "string.empty": "last name is required",
        "any.required": "last name is required",
    }),

    mobile: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .trim()
        .messages({
            "string.empty": "mobile is required",
            "string.pattern.base": "mobile required 6 characters of number",
            "any.required": "mobile is required",
        }),

    email: Joi.string().email({ tlds: false }).required().trim().messages({
        "string.empty": "email is required",
        "string.email": "email required",
        "any.required": "email is required",
    }),

    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{6,}$/)
        .required()
        .messages({
            "string.empty": "password is required",
            "string.pattern.base":
                "password must be at least 6 characters and contain only alphabet and number",
            "any.required": "password is required",
        }),
    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
            "string.empty": "confirm password is required",
            "any.only": "password and confirm password did not match",
            "any.required": "confirm password is required",
        })
        .strip(),

    role: Joi.string().optional(),
});

const validateRegister = (req, res, next) => {
    const { value, error } = registerSchema.validate(req.body);
    console.log(value);
    if (error) {
        throw error;
    }
    req.body = value;
    next();
};

module.exports = validateRegister;
