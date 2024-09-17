const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

// Initialize express app
const app = express();

// Set up cors options
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware set up
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes Handling
app.use(routes);

const server = app.listen(8000, () => {
    console.log("Connected at PORT 8000");
});
