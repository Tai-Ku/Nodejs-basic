import express from "express";
import route from "../controller/homeController";
let router = express.Router();
const initWebRoute = (app) => {
  router.get("/", route.getHomePage);
  router.get("/detail/user/:userId", route.getDetail);
  router.post("/create-new-user", route.createNewUser);
  router.get("/about", (req, res) => {
    res.send(`I'm Eric!`);
  });
  return app.use("/", router);
};
export default initWebRoute;
