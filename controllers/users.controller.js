const { createUserService, findAllUsersService, findUserService } = require("../services/user.service");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createNewUser = async (req, res)=>{
    const {name, email, password} = req.body;

    if(!email || !password)
    {
        return res.status(422).send({message: "Wrong email or password!"});
    }

    const user = await findUserService(email);

    if(user)
    {
        return res.send({message: "This email already exists, please choose another one"});
    }

    const encryptedPass = await bcrypt.hash(password, 10);

    const newUser = await createUserService({name, email, encryptedPass});
    res.send(newUser);
}

const login = async (req, res)=>{
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(422).send({message: "wrong email or password"});
    }

    const user = await findUserService(email);

    if(!user) {
        return res.status(401).send({message: "Incorrect email or password..."});
    }

    const isValidPassword = await bcrypt.compare(password, user.encryptedPass);

    if(!isValidPassword)
    {
        return res.status(401).send({message: "Incorrect email or password..."});
    }

    const token = jwt.sign({email}, 'myjwtsecret', {expiresIn: '1h'});

    res.header({jwt: token}).send({token, message: "Access Granted"}); 
    //Search for the header. Here we put the token in the header
}

const findAllUsers = async (req, res)=>{
    res.send(await findAllUsersService());
}
module.exports = {
    createNewUser,
    login,
    findAllUsers
}