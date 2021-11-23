const { verify } = require("jsonwebtoken");
const { Users } = require("../models");


// next-> te routes psh, e bon check maspari qet funksionin validateToken, nese tokeni osht valid  
// ateher vazhdo me pjesen e kodit qe e kemi thirr qat funksion 
const validateToken = (req, res, next) => {
    // the access token that we got from the front-end 
    const token = req.header("token");

    if (!token) return res.status(403).send("A token is required for authenticauon")

    try {
        const decoded = verify(token, "secretKey");
        req.user = decoded;
        console.log("valid token ", decoded);
        next();
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
}

// verify email
const verifyEmail = async (req, res, next) => {
    try {
        const user = await Users.findOne({ where: { email: req.body.email } })

        if (!user) {
            res.json({ error: "user doesn't exist" })
        }

        else if (user && user.isVerified) {
            next();
            // res.send(user.isVerified)
        }
        else {
            res.send({ error: "Please check your email to verify your account" })
        }
    }
    catch (err) {
        console.log("errrrrrrrrr", err)
    }
}

module.exports = { validateToken, verifyEmail }