var sql = require("mssql");

var dbConfig = {
  server: "DINCD-101",
  port: 1433,
  database: "prageethnew",
  user: "Training",
  password: "Training@123",
  trustServerCertificate: true,
};

var connection = new sql.ConnectionPool(dbConfig);

connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connected");
  }
});

module.exports=connection;