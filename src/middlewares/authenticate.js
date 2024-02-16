const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");

const authentiacate = catchError(async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer")) {
        createError("invalid authorization header", 401);
    }
    const token = authorization.split(" ")[1];
    const decodedPayload = jwtService.verify(token);

    const user = await userService.findUserById(decodedPayload.userId);
    if (!user) {
        createError("user was not found", 401);
    }
    delete user.password;
    req.user = user;
    console.log(user, "user");
    next();
});

module.exports = authentiacate;
