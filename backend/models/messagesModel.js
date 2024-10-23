const db = require("../config/database");

// need user id
const getChatlist = async (id) => {
    const query = 
    `SELECT 
        c.id,
        u1.id AS member_one_id,
        CONCAT(u1.firstname, ' ', u1.lastname) AS member_one,
        u2.id AS member_two_id,
        CONCAT(u2.firstname, ' ', u2.lastname) AS member_two,
        u3.id AS sender_id,
        CONCAT(u3.firstname, ' ', u3.lastname) AS sender,
        m.content,
        c.update_time
    FROM 
        conversations c
    JOIN 
        messages m ON c.id = m.conversation_id
    JOIN 
        users u1 ON c.member_one_id = u1.id  -- Join for member one
    JOIN 
        users u2 ON c.member_two_id = u2.id  -- Join for member two
    JOIN 
        users u3 ON m.sender_id = u3.id      -- Join for sender
    WHERE 
        (c.member_one_id = ? OR c.member_two_id = ?)
    AND 
        m.create_time = (
            -- Subquery to get the latest message create_time for each conversation
            SELECT MAX(create_time) 
            FROM messages 
            WHERE conversation_id = c.id
        )`;

    const rows = await db.query(query, [id, id]);
    // console.log("ROWS", rows);
    return rows;
};

const getMessages = async (id) => {
    const query = 
    `SELECT 
        c.id,
        u.id AS sender_id,
        m.content,
        m.create_time
    FROM 
        conversations c
    JOIN 
        messages m ON c.id = m.conversation_id
    JOIN 
        users u ON m.sender_id = u.id  -- Join for sender
    WHERE 
        c.id = ?`;
    const rows = await db.query(query, [id]);
    return rows;
    console.log("MESSAGES ROWS", rows);
};


module.exports = { getChatlist, getMessages };