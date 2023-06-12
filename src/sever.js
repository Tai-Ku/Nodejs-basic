import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import initAPIRoute from "./route/api";
// import connection from "./configs/connnectDB"

require("dotenv").config();

const app = express();
var morgan = require("morgan");
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  console.log(req.method);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
configViewEngine(app);
initWebRoute(app);
initAPIRoute(app);
// handle 404 not found
app.use((req, res) => {
  res.send("404 NOT FOUND");
});

app.listen(port, () => {
  console.log("server running 8080");
});
