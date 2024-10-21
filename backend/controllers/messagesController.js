const messagesModel = require("../models/messagesModel");

const getMessages = async (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    res.status(200).json({ message: "Working Backend" });
};

const getChatlist = async (req, res) => {
    const id = req.body.id;
    console.log(id);
    const result = await messagesModel.getChatlist(id)
    // console.log("RESULT", result[0], result[1]);
    res.status(200).json({ messages: result });
}

module.exports = { getMessages, getChatlist };