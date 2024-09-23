var express = require("express");
var router = express.Router();

var database = require("../database");

/* GET home page. */
router.get("/", function (req, res, next) {
  var query = "exec payslipdetails";

  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      res.render("display_data", {
        title: "Display Data",
        empdataFromDb: data.recordset,
       
      });
    }
  });
});

router.get("/add_data", function (req, res, next) {
  res.render("add_data", { title: "Add Data" });
});

router.post("/add_db", function (request, response, next) {
  var name = request.body.empname;
  var doj = request.body.doj;
  var email = request.body.empemail;
  var basicpay = request.body.basicpay;

  var query = `insert into payslip (name, doj, email, basicpay) values ('${name}','${doj}','${email}', ${basicpay} )`;
  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      response.redirect("/payslip");
    }
  });
});

router.get("/edit/:id", function (request, response, next) {
  var id = request.params.id;
  var query = `select FORMAT(doj,'yyyy-MM-dd') as formatted_date,* from payslip where empcode = ${id}`;

  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      response.render("edit_data", {
        title: "Edit Data",
        empdataFromDb: data.recordset[0],
      });
    }
  });
});

router.post("/edit/:id", function (request, response, next) {
  var id = request.params.id;
  var name = request.body.empname;
  var doj = request.body.doj;
  var email = request.body.empemail;
  var basicpay = request.body.basicpay;
  var query = `update payslip set name = '${name}', doj = '${doj}', email = '${email}', basicpay = ${basicpay} where empcode = ${id}`;
  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      response.redirect("/payslip");
    }
  });
});

router.get("/delete/:id", function (request, response, next) {
  var id = request.params.id;
  var query = `delete from payslip where empcode = ${id}`;
  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      response.redirect("/payslip");
    }
  });
});

router.get("/view/:id", function (request, response, next) {
  var id = request.params.id;
  var query = `select format(doj,'dd-MM-yyyy') as formatted_date, * from payslip where empcode = ${id}`;
  database.query(query, function (error, data) {
    if (error) {
      throw error;
    } else {
      response.render("view_data", {
        title: "View Data",
        empdataFromDb: data.recordset[0],
      });
    }
  });
});

module.exports = router;
