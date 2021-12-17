const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'happy2code',
  database: 'CNPMDB'
});

con.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected!!!');
  }
});

module.exports = con;
