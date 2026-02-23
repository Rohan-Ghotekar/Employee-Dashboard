const connection = require("../util/db");

const getAllEmployeesDao = async () => {
  const conn = await connection;
  const [rows] = await conn.execute(
    "SELECT id,employee_id, name, role,profile_image,address  FROM employees WHERE role='employee'"
  );
  console.log(rows);
  return rows;
};

const getEmployeeByIdDao = async (id) => {
  const conn = await connection;
  const [rows] = await conn.execute(
    "SELECT id,employee_id, name, role, profile_image,address FROM employees WHERE id=?",
    [id]
  );
  return rows[0];
};

const deleteEmployeeDao = async (id) => {
  const conn = await connection;
  console.log(id);
  await conn.execute("DELETE FROM employees WHERE id=?", [id]);
};

module.exports = {
  getAllEmployeesDao,
  getEmployeeByIdDao,
  deleteEmployeeDao
};