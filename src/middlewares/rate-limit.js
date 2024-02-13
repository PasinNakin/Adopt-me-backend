const { rateLimit } = require("express-rate-limit");

module.exports = rateLimit({
    windowMs: 30 * 60 * 1000,
    limit: 100,
    message: { message: "too many request" },
});
