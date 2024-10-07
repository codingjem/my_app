require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routes = require("./routes");

// Initialize express app
const app = express();

// Set up cors options
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Let cookies be sent
};

// Middleware set up
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes Handling
app.use(routes);

const server = app.listen(8000, () => {
    console.log("Connected at PORT 8000");
});
