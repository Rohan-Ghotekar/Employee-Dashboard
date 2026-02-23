const {
  getAllEmployeesDao,
  getEmployeeByIdDao,
  deleteEmployeeDao
} = require("../dao/employeeDao");

async function getAllEmployees() {
  return await getAllEmployeesDao();
}

async function getEmployeeById(id) {
  return await getEmployeeByIdDao(id);
}

async function deleteEmployee(id) {
  await deleteEmployeeDao(id);
  return { success: true, message: "Employee deleted" };
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  deleteEmployee
};