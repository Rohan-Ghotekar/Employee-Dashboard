const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  getEmployeeById,
  deleteEmployee
} = require("../service/employeeService");

const { checkRole } = require("../middleware/authRole");


router.get("/", checkRole("admin"), async (req, res) => {
  const data = await getAllEmployees();
  res.json(data);
});


router.get("/:id", async (req, res) => {
  const data = await getEmployeeById(req.params.id);
  res.json(data);
});


router.delete("/:id", checkRole("admin"), async (req, res) => {
  console.log(req.params.id); 
  const result = await deleteEmployee(req.params.id);
  res.json(result);
});

module.exports = router;