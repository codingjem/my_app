const db = require("../config/database");
// db.query always returns an array of object/s

const getAllUsers = async () => {
    const [rows] = await db.query("SELECT * FROM user");
    return rows;
};

const findUser = async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    console.log(result)
    return { exists: result.length > 0 }
};

const getUser = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows;
};

const addUser = async ({ firstname, lastname, email, password }) => {
    const query = "INSERT INTO users (firstname, lastname, email, password, create_time) VALUES (?, ?, ?, ?, NOW())";
    db.query(query, [firstname, lastname, email, password]);
    return { firstname };
};

module.exports = { getAllUsers, findUser, getUser, addUser };