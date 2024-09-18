const mysql = require("mysql");
const util = require("util");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "small_circle",
});

connection.connect((err) => {
    if (err) {
        console.error("Error!, Database NOT CONNECTED");
        return;
    }
    console.log("Connected to Database");
});

connection.query = util.promisify(connection.query);

module.exports = connection;