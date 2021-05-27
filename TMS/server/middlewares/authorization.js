const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
try {

    //Get token from header
    const jwtToken = req.header("token");

    //check if token exist.
    if (!jwtToken) {
        return res.json("Not Autherize")
    }

    //Validate token 
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;

    

} catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Autherize");
}

next();

}