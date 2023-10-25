const mongoose = require('mongoose');

//Schema
const UserSchema = new mongoose.Schema({
    name:String, //name:{type:String,required:true}
    age:Number,
    comments:[{
        user:String,
        rating:Number,
    }],
    // date:Date,
    date:{type:Date, default: Date.now},
    hidden:Boolean

},{
    versionKey:false
})
//Model
//Used To Do CRUD Operations
//dp ->users ->documents
const UserModel = mongoose.model('User' ,UserSchema)
module.exports = UserModel;
//User=users automatic

// CRUD Operations
// UserModel.create();
// UserModel.find();
// UserModel.delete();
