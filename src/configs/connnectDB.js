// get the client
import mysql from "mysql2/promise"

// create the connection to database
console.log('creating pool')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbasic'
}); 

export default pool