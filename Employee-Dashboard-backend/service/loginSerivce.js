const bcrypt = require("bcrypt");
const { validateUserDao } = require("../dao/loginDao");

async function validateUser(username, password) {

    const user = await validateUserDao(username);

    if (!user) {
        return { success: false, message: "User not found" };
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return { success: false, message: "Invalid password" };
    }
    return {
        success: true,
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    };
}

module.exports = { validateUser };