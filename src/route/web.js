import express from "express";
import route from "../controller/homeController";
import multer from "multer";
import helper from "../untils/helper";
import path from "path";

let router = express.Router();
var appRoot = require("app-root-path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({ storage: storage, fileFilter: helper.imageFilter });
let upload1 = multer({
  storage: storage,
  fileFilter: helper.imageFilter,
}).array("multiple_images", 3);
const initWebRoute = (app) => {
  router.get("/", route.getHomePage);
  router.get("/detail/user/:userId", route.getDetail);
  router.post("/create-new-user", route.createNewUser);
  router.post("/delete-user", route.deleteUser);
  router.get("/edit-user/:id", route.editUser);
  router.post("/update-user", route.updateUser);
  router.get("/about", (req, res) => {
    res.send(`I'm Eric!`);
  });
  router.get("/upload", route.upLoadFile);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    route.handleUploadFile
  );

  router.post(
    "/upload-multiple-images",
    (req, res, next) => {
      upload1(req, res, (err) => {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          console.log("check instanecof", err instanceof multer.MulterError);
          console.log("err.code", err.code);
          res.send("Max file is 3");
        } else if (err) {
          res.send(err);
        } else {
          next();
        }
      });
    },
    route.handleMultiFile
  );
  return app.use("/", router);
};
export default initWebRoute;
