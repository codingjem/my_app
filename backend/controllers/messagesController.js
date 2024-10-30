const messagesModel = require("../models/messagesModel");

const getMessages = async (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const result = await messagesModel.getMessages(id);
    console.log("GET MESSAGES RESULT", result);
    res.status(200).json({ messages: result });
};

const getChatlist = async (req, res) => {
    const id = req.body.id;
    console.log(id);
    const result = await messagesModel.getChatlist(id);
    // console.log("RESULT", result[0], result[1]);
    res.status(200).json({ chatlist: result });
};

// controllers for the socket
const getSocketMessages = async (id) => {
    const result = await messagesModel.getMessages(id);
    return { messages: result };
};

const addSocketMessage = async (data) => {
    await messagesModel.addMessage(data);
    const result = await getSocketMessages(data.conversation_id);
    return result;
};

module.exports = { getMessages, getChatlist, addSocketMessage, getSocketMessages };