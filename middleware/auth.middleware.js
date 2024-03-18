const { findUserService } = require("../services/user.service");
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.headers['jwt']; // The token we put in the controllers

        if(!token)
        {
            return res.status(401).send({message: "unauthoraized user"})
        }

        const payload = await jwt.verify(token, "myjwtsecret"); // put myjwtsecret in the env
        const {email} = payload;

        console.log(payload);
        const user = await findUserService(email);

        if(!user)
        {
            return res.status(401).send({message: "unauthoraized user"})
        }
        next();
    }catch(e)
    {
        return res.status(401).send({message: e});
    }
}

module.exports = auth;