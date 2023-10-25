const express = require('express');
const UserModel = require('../models/user.model');

// Read operation - Get all users
const getAllUsers = (req, res) => {
  UserModel.find()
    .then(users => {
      res.json({
        message: 'Users retrieved successfully',
        status: 200,
        data: users
      });
    })
    .catch(error => {
      res.json({
        message: 'Error occurred',
        status: 500,
        error: error.message
      });
    });
};

module.exports = { getAllUsers };

console.log(getAllUsers);