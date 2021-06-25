const express = require('express')
const mongoose = require('mongoose');
const session = require('express-session');
const config=require('./config');
const db=require('./dbConnect');
const UserModel=require('./model/UserModel')
var multer = require('multer');
var path = require('path');

const blogRoute=require('./api/blog')

const app=express();
app.use('/api/uploads',express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  var upload = multer({ storage: storage });

app.use(session({
    secret:'ssshh!!',
    resave:false,
    saveUninitialized:false,
}))

app.use('/api',blogRoute) 
app.get('/',(req,res)=>{
    res.json('hello uday')
})

app.post("/api/login",(req,res)=>{
    let user={
        username:req.body.username,
        password:req.body.password,
    }
    console.log(UserModel)
    UserModel.findOne(user,(err,result)=>{
        console.log(result)
        if(result){
            req.session.user=result._id
            res.json({
                'success': true,
                'error': null,
                "logIn":true,
            })
        }else{
            res.json({
                'success': true,
                'error': null,
                "logIn":false,
            })
        }
    })
   
})


app.post('/api/profile',upload.single('image'), function (req, res) {
    console.log(req.files)
    res.json('send')
  })
app.post('/api/getImages',upload.single('image'), function (req, res) {
    console.log(req.files)
    res.json('send')
  })

app.listen(config.serverPort,()=>{
    console.log('Server is running on port '+config.serverPort)
    db.connect()
   
})





