const messagesModel = require("../models/messagesModel");

const getMessages = async (req, res) => {
    const id = req.body.id;
    const result = await messagesModel.getMessages(id);
    res.status(200).json({ messages: result });
};

const getChatlist = async (req, res) => {
    const id = req.body.id;
    const result = await messagesModel.getChatlist(id);
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

const getSocketChatlist = async (id) => {
    const result = await messagesModel.getChatlist(id);
    return { chatlist: result };
};

module.exports = { getMessages, getChatlist, addSocketMessage, getSocketMessages, getSocketChatlist };