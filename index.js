require('dotenv').config();
require('./database');

const express = require("express");
const courseRouter = require('./routes/courses.router');
const userRouter = require('./routes/users.router');
const ejs = require('ejs');

const app = express();
const port = parseInt(process.env.PORT);

app.use(express.json());
app.use(express.static('public'));
app.use('/', courseRouter);
app.use('/', userRouter);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/ejs', (req, res)=>{
    res.render('index', {title: 'Hello World', message: "Welcome to EJS!"});
})

app.listen(port, () => {
    console.log(`Connected on port ${port}...`);
});