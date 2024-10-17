const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: {
                code: "UNAUTHORIZED",
                message: "No authorization token provided",
            }
        });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // if token expired
            // log err.name if the error exist!
            if (err && err.name === "TokenExpiredError") {
                return res.status(403).json({
                    code: "ACCESS_TOKEN_EXPIRED",
                    message: "Your access token has expired",
                });
            }
            // if error is empty or does not match
            return res.status(403).json({
                code: "INVALID_TOKEN",
                message: "Your access token is invalid.",
            });
        }
        
        req.user = decoded.email;
        next();
    });
};

module.exports = { verifyJWT };

// authorization header is standard HTTP header used to include credentials in an HTTP request. It is often used for authentication purposes, including passing tokens like JSON Web Tokens (JWT)
// optional chaining, prevents throwing error when the authHeader does not exist, undefined, null, evaluates to undefined