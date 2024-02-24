import mongoose from 'mongoose';

const AdminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:'HostelAdmin',
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    contact:{
        type:Number,
        requred:true,
        min:10,
    },
    password:{
        type:String,
        required:true,
        min:8,
    }
});

module.exports=mongoose.model('AdminData',AdminSchema);