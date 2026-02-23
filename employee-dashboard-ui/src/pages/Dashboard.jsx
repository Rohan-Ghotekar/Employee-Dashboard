import React, { useContext, useEffect} from "react";
import { AuthContext } from "../Auth/Authantication";
import {
  getAllEmployees,
  getEmployeeById,
} from "../api/employeeApi";
import EmployeeCard from "../components/EmployeeCard";



export default function Dashboard({employees, setEmployees }) {
  const { user } = useContext(AuthContext);
  // const [employees, setEmployees] = useState([]);
  useEffect(() => {
  if (!user) return;

  const loadData = async () => {
    if (user.role === "admin") {
      const data = await getAllEmployees(user.role);
      setEmployees(data);
    } else {
      const emp = await getEmployeeById(user.id);
      setEmployees([emp]);
    }
  };

  loadData();

}, [user]);

  return (
    <div>
      <h2>Dashboard</h2>
      {employees.map(emp => (
        <div key={emp.id}>
          <EmployeeCard employee={emp} isAdmin={user?.role === "admin"}  setEmployees={setEmployees}/>
        </div>
      ))}
    </div>
  );
}