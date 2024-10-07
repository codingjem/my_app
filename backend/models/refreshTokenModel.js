const db = require("../config/database");

const addRefreshToken = async ({ userId, refreshToken }) => {
    const query = "INSERT into refresh_tokens (user_id, refresh_token, create_time) VALUES (?, ?, NOW())";
    db.query(query, [userId, refreshToken]);
}

const deleteRefreshToken = async ({ userId }) => {
    const query = "DELETE FROM refresh_tokens WHERE user_id = ?";
    db.query(query, [userId]);
}

const findUser = async (refreshToken) => {
    const query = "SELECT refresh_tokens.refresh_token, users.email FROM refresh_tokens LEFT JOIN users ON refresh_tokens.user_id = users.id WHERE refresh_tokens.refresh_token = ?";
    const [rows] = await db.query(query, [refreshToken]);
    return rows;

}
module.exports = { addRefreshToken, deleteRefreshToken, findUser };