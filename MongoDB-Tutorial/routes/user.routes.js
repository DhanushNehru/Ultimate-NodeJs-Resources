const express = require('express');
const router = express.Router();
const UserControllers=require('../controllers/user.controllers')


//Routes Creation in Express
//http://localhost:5000/users/create
//{"message":"Its Working","status":200}


// app.get('/users/create',(req,res)=>{
//     res.json({
//       message:"Its Working",
//       status:200                       
//     })
//   })

//Routes Creation in Express -> router + callback
//http://localhost:5000/users/create
//{"message":"Its Working","status":200}

//   router.get('/create',(req,res)=>{
//     res.json({
//       message:"Its Working",
//       status:200                       
//     })
//   })

router.get('/create',UserControllers.CreateUser)


  module.exports = router