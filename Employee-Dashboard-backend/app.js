const express = require("express");
const cors = require("cors");
const loginRouter = require("./routes/login");
const employeeRouter = require("./routes/employee");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/webservice/login", loginRouter);
app.use("/webservice/employees", employeeRouter);
module.exports = app;