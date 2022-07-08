const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const conn = mysql.createConnection(config);
const createTableSQL = `CREATE TABLE IF NOT EXISTS people (id int not null auto_increment, name varchar(255), primary key (id))`;
conn.query(createTableSQL);
const truncateTableSQL = `TRUNCATE TABLE people;`;
conn.query(truncateTableSQL);
app.get("/", (req, res) => {
  const insertSQL = `INSERT INTO people(name) values ('Rafael')`;
  conn.query(insertSQL);
  let outputHtml = "<h1>Full Cycle Rocks!</h1>";
  outputHtml += "<ul>";
  conn.query(
    "SELECT * FROM people;",
    (err, rows, fields) => {
      for (let row of rows) {
        outputHtml += "<li>" + row.name + "</li>";
      }
      outputHtml += "</ul>";
      return res.send(outputHtml);
    }
  );
});
app.listen(port, () => console.log("Ouvindo porta 3000"));
