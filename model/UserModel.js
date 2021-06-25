const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    username: String,
    password: String
  });
let usermodel=mongoose.model('User',userSchema)

module.exports=usermodel