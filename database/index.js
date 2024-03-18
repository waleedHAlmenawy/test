const mongoose = require('mongoose');

const dburl = "mongodb://localhost:27017";

const dbConnection = mongoose.connect(dburl).then(()=>{
    console.log("Successful connection to Mongodb");
}).catch((err)=>{
    console.log(err);
});

module.exports = dbConnection;