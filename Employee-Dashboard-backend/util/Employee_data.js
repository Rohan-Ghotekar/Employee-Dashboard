const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
// Run this file only when you want to hard core data in database
const dbConfig = {
// database Connection details
};

// 🔹 Generate 50 Employees with Unique Usernames
function generateEmployees() {
  const names = [
    "Amit Sharma","Priya Patil","Rahul Deshmukh","Sneha Kulkarni","Vikram Joshi",
    "Neha More","Rohit Shinde","Anjali Pawar","Karan Jadhav","Pooja Sawant",
    "Sagar Bhosale","Meera Chavan","Aditya Gaikwad","Kavita Patwardhan","Nikhil Wagh",
    "Shweta Mane","Manish Gite","Tanvi Rane","Akash Pujari","Deepali Naik",
    "Omkar Salunkhe","Vaishnavi Koli","Harshal Patil","Gauri Shirodkar","Siddharth Kale",
    "Rutuja Mahajan","Abhishek Dighe","Ishita Pande","Tejas Ghorpade","Mrunal Inamdar",
    "Soham Bendre","Aarohi Desai","Ritesh Pawar","Kunal Bhagat","Shruti Jagtap",
    "Yash Thakur","Pranali Khedekar","Arjun Bhalerao","Simran Choudhary","Nitesh Tiwari",
    "Rashmi Patankar","Sanket Lokhande","Bhakti Kadam","Gaurav Dange","Ira Kulkarni",
    "Tushar More","Pallavi Raut","Chirag Salvi","Ankita Gawade","Saurabh Kshirsagar"
  ];

  const cities = [
    "Mumbai","Pune","Nagpur","Nashik","Thane",
    "Aurangabad","Kolhapur","Solapur","Amravati","Nanded",
    "Sangli","Jalgaon","Latur","Dhule","Ahmednagar",
    "Chandrapur","Beed","Parbhani","Ratnagiri","Satara",
    "Wardha","Yavatmal","Bhandara","Sindhudurg","Gondia",
    "Mumbai","Pune","Nagpur","Nashik","Thane",
    "Mumbai","Pune","Nagpur","Nashik","Thane",
    "Mumbai","Pune","Nagpur","Nashik","Thane",
    "Mumbai","Pune","Nagpur","Nashik","Thane",
    "Mumbai","Pune","Nagpur","Nashik","Thane"
  ];

  return names.map((name, index) => {
    const firstName = name.split(" ")[0];

    const genderPath = index % 2 === 0 ? "men" : "women";
    const imageNumber = index % 100;

    // Make username unique by appending index
    const username = `${firstName}${30}`;

    return {
      name,
      company_name: "Pratiti Technology",
      employee_id: `EMP${String(index + 1).padStart(3, '0')}`,
      address: `${cities[index % cities.length]}, Maharashtra`,
      username,
      password: username, // password same as username
      role: "employee",
      profile_image: `https://randomuser.me/api/portraits/${genderPath}/${imageNumber}.jpg`
    };
  });
}

// 🔹 Drop & Create Fresh Table
async function createTable(connection) {
  await connection.execute(`DROP TABLE IF EXISTS employees`);

  await connection.execute(`
    CREATE TABLE employees (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100),
      company_name VARCHAR(100),
      employee_id VARCHAR(20),
      address VARCHAR(255),
      username VARCHAR(50) UNIQUE,
      password VARCHAR(255),
      role VARCHAR(20) NOT NULL DEFAULT 'employee',
      profile_image VARCHAR(255)
    )
  `);
}

// 🔹 Insert Employees
async function insertEmployees(connection, employees) {
  for (const emp of employees) {
    try {
      const hashedPassword = await bcrypt.hash(emp.password, SALT_ROUNDS);

      await connection.execute(
        `INSERT INTO employees 
        (name, company_name, employee_id, address, username, password, role, profile_image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          emp.name,
          emp.company_name,
          emp.employee_id,
          emp.address,
          emp.username,
          hashedPassword,
          emp.role,
          emp.profile_image
        ]
      );
    } catch (err) {
      console.error(`❌ Failed to insert ${emp.username}:`, err.message);
    }
  }
}

// 🔹 Insert Admin
async function insertAdmin(connection) {
  const hashedPassword = await bcrypt.hash("admin", SALT_ROUNDS);

  await connection.execute(
    `INSERT INTO employees 
    (name, company_name, employee_id, address, username, password, role, profile_image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "System Admin",
      "Pratiti Technology",
      "ADMIN001",
      "Mumbai, Maharashtra",
      "admin",
      hashedPassword,
      "admin",
      "https://randomuser.me/api/portraits/men/99.jpg"
    ]
  );
}

// 🔹 Login Function
async function login(connection, username, enteredPassword) {
  const [rows] = await connection.execute(
    `SELECT * FROM employees WHERE username = ?`,
    [username]
  );

  if (rows.length === 0) {
    console.log("❌ User not found");
    return;
  }

  const user = rows[0];
  const isMatch = await bcrypt.compare(enteredPassword, user.password);

  if (isMatch) {
    console.log(`✅ Login successful | Role: ${user.role}`);
  } else {
    console.log("❌ Invalid password");
  }
}

// 🔹 Main
async function main() {
  try {
    const connection = await mysql.createConnection(dbConfig);

    await createTable(connection);

    const employees = generateEmployees();
    await insertEmployees(connection, employees);

    await insertAdmin(connection);

    console.log("✅ 50 Employees + 1 Admin Inserted Successfully");

    // 🔎 Verify Count
    const [count] = await connection.execute(`SELECT COUNT(*) as total FROM employees`);
    console.log("📊 Total Records:", count[0].total); // Should print 51

    console.log("\n🔐 Testing Login:");
    await login(connection, "Amit30", "Amit30"); // First employee
    await login(connection, "admin", "admin");   // Admin

    await connection.end();
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

main();