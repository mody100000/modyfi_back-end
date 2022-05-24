const mysql = require("mysql");

const config = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "modyfi",
};

var connection = mysql.createConnection(config); //added the line

connection.connect(function (err) {
  if (err) {
    return console.log("error connecting:" + err.stack);
  }
  console.log("connected successfully to DB.");
});

module.exports = {
  connection,
};
