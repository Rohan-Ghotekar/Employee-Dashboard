const connection = require("../util/db.js");

const validateUserDao = async (username) => {

    const sql = "SELECT * FROM employees WHERE username = ?";
    try {
        const conn = await connection;
        const [rows] = await conn.execute(sql, [username]);

        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    } catch (err) {
        console.log("Error:", err.message);
        return null;
    }
}

module.exports = { validateUserDao };
