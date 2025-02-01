const db = require("../config/database");
// db.query always returns an array of object/s

const getAllUsers = async () => {
    const [rows] = await db.query("SELECT * FROM user");
    return rows;
};

const findUser = async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = ?", [email]);
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

const editUser = async ({ id, firstname, lastname }) => {
    const query = "UPDATE users SET firstname = ?, lastname = ?, update_time = NOW() WHERE id = ?";
    db.query(query, [firstname, lastname, id]);
    return {firstname, lastname};
};

module.exports = { getAllUsers, findUser, getUser, addUser, editUser };