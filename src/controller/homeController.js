import { json } from "body-parser";
import pool from "../configs/connnectDB";

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
  console.log(firstName, lastName, email, address);
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
module.exports = {
  getHomePage,
  getDetail,
  createNewUser,
  deleteUser,
  editUser,
  updateUser,
};
