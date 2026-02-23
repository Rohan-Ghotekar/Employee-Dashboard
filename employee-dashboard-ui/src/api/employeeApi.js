const BASE_URL = "http://localhost:1234/webservice";
export async function getAllEmployees(role) {
  const response = await fetch(
    `${BASE_URL}/employees?role=${role}`
  );
  
  
  return await response.json();
}

export async function getEmployeeById(id) {
  const response = await fetch(
    `${BASE_URL}/employees/${id}`
  );
  return await response.json();
}

export async function deleteEmployee(id, role) {
  console.log(id);
  const response = await fetch(
    `${BASE_URL}/employees/${id}?role=${role}`,
    {
      method: "DELETE"
    }
  );
  return await response.json();
}