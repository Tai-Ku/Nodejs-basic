import pool from "../configs/connnectDB";

let getAllUser = async (req, res) => {
  const [rows, fields] = await pool.execute("select *  from users ");
  console.log(rows);
  return res.status(200).json({
    message: "oke",
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  const { firstName, lastName, email, address } = req.body;
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({
      message: "missing",
    });
  }
  await pool.execute(
    "insert into users  (FirstName,LastName,email,address) values (?,?,?,?)",
    [firstName, lastName, email, address]
  );
  return res.status(200).json({
    message: "oke",
  });
};
let deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(200).json({
      message: "missing",
    });
  }
  await pool.execute("DELETE FROM users WHERE id = ?", [userId]);
  return res.status(200).json({
    message: "oke",
  });
};
let updateUser = async (req, res) => {
  const { firstName, lastName, email, address, id } = req.body;
  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({
      message: "missing",
    });
  }
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
  return res.status(200).json({
    message: "oke",
  });
};

module.exports = {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
};
