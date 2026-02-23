
export async function loginUser(username, password) {
  const response = await fetch("http://localhost:1234/webservice/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });

  return await response.json();
}