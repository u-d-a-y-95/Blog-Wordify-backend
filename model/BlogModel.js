const mongoose = require('mongoose');
let blogSchema = new mongoose.Schema({
    title: String,
    author:String,
    date: Date,
    description:String,
    category:String,
    imgUrl:[String],

  });
let blogmodel=mongoose.model('Blog',blogSchema)

module.exports=blogmodel