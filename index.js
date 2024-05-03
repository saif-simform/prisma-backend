const cookieParser = require("cookie-parser");
const express = require("express");
const CONFIG = require("./config/config.js");
const route = require("./routes");
const authRoute = require("./authRoutes");

//Initiate application
const app = express();
const PORT = CONFIG.port;

// Cookies middlware
app.use(cookieParser());

//In-built express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// auth routes
app.use("/auth", authRoute);

// Api routes
app.use("/api", route);

// app.get("/", (req, res) => {
//   res.send({ message: "Welcome to prisma" });
// });

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
