import { deleteEmployee } from "../api/employeeApi";
function EmployeeCard({ employee,isAdmin ,setEmployees}) {
  const handleDelete = async (id) => {
    console.log(id);
      await deleteEmployee(id, "admin");
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      console.log(isAdmin)
    };
  return (

    <div className="employee-container">
      <div className="employee-card">
      <img src={employee.profile_image} alt={employee.name} />
      <h5>{employee.name}</h5>
      <p>ID: {employee.employee_id}</p>
      <p>{employee.role}</p>
      <p>{employee.address ? employee.address : "Address not available"}</p>
      {isAdmin && (
        <button
          className="btn" style={{margin:"1rem", borderRadius:"5px", padding:"10px", color:"white", backgroundColor:"red", fontWeight:"bold"}}
          onClick={() => handleDelete(employee.id)}
        >
          Delete
        </button>
      )}
      </div>
    </div>
  );
}

export default EmployeeCard;