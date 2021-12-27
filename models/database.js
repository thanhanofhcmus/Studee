const mysql = require('mysql');

const env = process.env;

const con = mysql.createConnection({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE
});

const connect = () => {
  con.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected!!!');
    }
  });
};

// module.exports = con;
