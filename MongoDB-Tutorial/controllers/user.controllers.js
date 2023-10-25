const express = require('express');
const UserModel = require('../model/user.model');
const UserData = require('../db/data')


//Creation of controller
const CreateUser = (req, res) => {
  UserModel.create(UserData)
    .then(createdUser => {
      res.json({
        message: 'User Created',
        status: 200,
        data:data,
        userId: createdUser._id // Example: sending the user ID
      });
    })
    .catch(error => {
      res.json({
        message: 'Error Occurred',
        status: 404,
        error: error.message
      });
    });
};

//http://localhost:5000/user/create
//{"message":"Its DpVasani","status":200}
module.exports = { CreateUser };


