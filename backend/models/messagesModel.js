const db = require("../config/database");

// need user id
const getChatlist = async (id) => {
    const query = `SELECT 
        m.id,
        m.sender_id,
        CONCAT(sender.firstname, " ", sender.lastname) AS sender_name,
        m.receiver_id,
        CONCAT(receiver.firstname, " ", receiver.lastname) AS receiver_name,
        m.content,
        m.create_time
    FROM messages m
    INNER JOIN users sender ON m.sender_id = sender.id
    INNER JOIN users receiver ON m.receiver_id = receiver.id
    WHERE m.id IN (
        SELECT MAX(m.id)
        FROM messages m
        WHERE m.sender_id = 33 OR m.receiver_id = 33
        GROUP BY 
            CASE 
                WHEN m.sender_id = 33 THEN m.receiver_id 
                ELSE m.sender_id 
            END
    )
    ORDER BY m.create_time DESC`

    const rows = await db.query(query, [id, id]);
    // console.log("ROWS", rows);
    return rows;
};

module.exports = { getChatlist };