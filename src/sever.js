import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
// import connection from "./configs/connnectDB"

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
  console.log("server running 8080");
});
