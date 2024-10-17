const jwt = require("jsonwebtoken");
const refreshTokenModel = require("../models/refreshTokenModel");

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        // if no refresh token, log out
        return res.status(401).json({
            code: "REFRESH_TOKEN_COOKIE_CLEARED",
            message: "Your refresh token cookie has been cleared.",
        });
    }

    const refreshToken = cookies.jwt;

    const foundUser = await refreshTokenModel.findUser(refreshToken);
    if (!foundUser) {
        // if no user, log out
        return res.status(403).json({
            code: "USER_NOT_FOUND",
            message: "Your refresh token does not belong to any of the users",
        });
    }

    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (decoded && foundUser.email !== decoded.email) {
                return res.status(403).json({
                    code: "REFRESH_TOKEN_NOT_MATCHED",
                    message: "Refresh token did not match.",
                });
            }

            if (err) {
                return res.status(403).json({
                    code: "REFRESH_TOKEN_EXPIRED",
                    message: "Refresh token already expired.",
                });
            }

            const accessToken = jwt.sign(
                { email: decoded.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10s" }
            );

            res.json({ accessToken });
        }
    );
};

module.exports = { handleRefreshToken };
