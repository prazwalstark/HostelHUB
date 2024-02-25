import mongoose from 'mongoose';

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    contact:{
        type:Number,
        required:true,
        unique:true,
        min:10,
    },
    password:{
        type:String,
        // required:true,
        minlength:8,
    },
    rollNo:{
        type:String,
        required:true,
        unique:true,
    },
    block:{
        type:String,
    },
    roomNo:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        default:'Student'
    },
    guardianName:{
        type:String,
        required: true,
    },
    guardianContact:{
        type:Number,
        required:true,
        min:10,
    },
    guardianRelationship:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true,
        default:new Date(),
    }
});

const User=mongoose.model('UserData',UserSchema);
export default User;