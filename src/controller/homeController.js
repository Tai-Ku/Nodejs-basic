import { json } from "body-parser";
import pool from "../configs/connnectDB";
import multer from "multer";
import helper from "../untils/helper";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs", { dataUser: rows });
};
let getDetail = async (req, res) => {
  const id = req.params.userId;
  if (id) {
    const user = await pool.execute("select * from users where id = ?", [id]);
    return res.send(JSON.stringify(user[0]));
  }
};
let createNewUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "insert into users  (FirstName,LastName,email,address) values (?,?,?,?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};
let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("DELETE FROM users WHERE id = ?", [userId]);
  return res.redirect("/");
};

let editUser = async (req, res) => {
  let id = req.params.id;
  const [user] = await pool.execute("select * from users where id = ?", [id]);

  return res.render("update.ejs", { dataUser: user[0] });
};
let updateUser = async (req, res) => {
  const { firstName, lastName, email, address, id } = req.body;

  await pool.execute(
    "update users set FirstName = ? , LastName = ? , email = ? , address = ? where id = ?",
    [
      firstName || nul,
      lastName || null,
      email || null,
      address || null,
      id || null,
    ]
  );

  return res.redirect("/");
};

const upload = multer().single("profile_pic");

let handleUploadFile = (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form

  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`
    );
  });
};

let upLoadFile = (req, res) => {
  return res.render("upload.ejs");
};

module.exports = {
  getHomePage,
  getDetail,
  createNewUser,
  deleteUser,
  editUser,
  upLoadFile,
  updateUser,
  handleUploadFile,
};
