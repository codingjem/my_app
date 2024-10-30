const socketIO = require("socket.io");
const messagesController = require("./controllers/messagesController");

module.exports = (server) => {
    // Initialize Socket.IO with CORS options
    const io = socketIO(server, {
        cors: {
            origin: "http://localhost:5173", // Frontend URL
            methods: ["GET", "POST"],
            allowedHeaders: ["Content-Type", "Authorization"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected", socket.id);
        // Handle active chatrooms
        socket.on("joinChatroom", ({ chatId, userId }) => {
            socket.join(chatId);
            // console.log("CHATID", chatId);
        });

        // Handle incoming messages
        socket.on("sendMessage", async (data) => {
            console.log("MESSAGE SENT", data);
            // Save the message here to the database.
            const result = await messagesController.addSocketMessage(data);
            console.log("MESSAGE DATA", result);
            // send the updated messages to frontend
            io.to(data.conversation_id).emit("receiveMessages", result);
        });

        socket.on("disconnect", () => {
            console.log("A user disconnected", socket.id);
        });
    });
}