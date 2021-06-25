const mongoose=require('mongoose');
const config=require('./config');
var mongoDB = `mongodb://${config.host}/${config.dbName}`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
let db;
module.exports.connect= ()=>{
    db=mongoose.connection;
}


