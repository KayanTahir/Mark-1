var mysql = require('mysql');

var db_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'mark'
  });
  
  module.exports = db_con