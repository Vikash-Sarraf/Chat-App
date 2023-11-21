const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            const decoded = jwt.verify(token, 'secret');
            console.log(decoded);
            req.body._id = decoded?._id;
            req.body.currentUser = decoded?.username
        }
        next();
    } catch (error) {
        console.log(error);
    }
};


module.exports = authMiddleware