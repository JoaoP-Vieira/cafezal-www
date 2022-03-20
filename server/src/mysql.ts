import mysql from 'mysql';

const conn = mysql.createPool({
  user: 'joao',
  host: 'localhost',
  password: 'password',
  database: 'cafezal',
  port: 3306,
});

export default conn;
