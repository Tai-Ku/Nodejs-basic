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
module.exports = {
  getHomePage,
  getDetail,
  createNewUser,
};
