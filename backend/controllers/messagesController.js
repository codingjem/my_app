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
}

module.exports = { getMessages, getChatlist };