require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const notFound = require("./middlewares/not-found");
const error = require("./middlewares/error");
const rateLimit = require("./middlewares/rate-limit");
const authRoute = require("./routes/auth-route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimit);
app.use(morgan("dev"));

app.use("/auth", authRoute);

app.use(notFound);
app.use(error);

const PORT = process.env.PORT || 8008;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
