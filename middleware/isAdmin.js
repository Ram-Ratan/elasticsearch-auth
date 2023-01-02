const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const isAdmin = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
        res.send("Please enter a valid token");
    } else {
        const token = bearerHeader.split(" ")[1];
        jwt.verify(token, jwtSecretKey, (err) => {
            if (err) {
                res.send(err.message);
            } else {
                next();
            }
        })
    }
}



module.exports = isAdmin;