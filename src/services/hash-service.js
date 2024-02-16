const bcrypt = require("bcryptjs");

exports.hash = (input) => bcrypt.hash(input, 12);

exports.compare = (plainText, hashvalue) =>
    bcrypt.compare(plainText, hashvalue);
