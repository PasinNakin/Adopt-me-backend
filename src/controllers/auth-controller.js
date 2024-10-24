const catchError = require("../utils/catch-error");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");

exports.register = catchError(async (req, res, next) => {
    const existsUser = await userService.findUserByEmail(req.body.email);
    if (existsUser) {
        createError("email has already in use", 400);
    }

    req.body.password = await hashService.hash(req.body.password);

    const newUser = await userService.createUser(req.body);
    const payload = { userId: newUser.id }; //////???
    const accessToken = jwtService.sign(payload);
    delete newUser;

    res.status(201).json({ accessToken, newUser });
});

exports.login = catchError(async (req, res, next) => {
    const existUser = await userService.findUserByEmail(req.body.email);
    if (!existUser) {
        createError("invalid credential", 400);
    }
    const isMatch = await hashService.compare(
        req.body.password,
        existUser.password
    );
    if (!isMatch) {
        createError("invalid credential", 400);
    }
    const payload = { userId: existUser.id };
    const accessToken = jwtService.sign(payload);
    delete existUser.password;

    res.status(200).json({ accessToken, user: existUser });
});

exports.getMe = (req, res, next) => {
    res.status(200).json({ user: req.user });
};

exports.editProfile = catchError(async (req, res, next) => {
    if (
        !req.body.id &&
        !req.body.email &&
        !req.body.password &&
        !req.body.role
    ) {
        const existMobileNumber = await userService.findUserByEmail(
            req.body.mobile
        );
        if (existMobileNumber) {
            createError("This phone number is already in use.", 400);
        }
        const editUser = await userService.editUserById(req.user.id, req.body);
        res.status(200).json(editUser);
    }
    res.status(403).json({ message: "Can not change this data" });
});
