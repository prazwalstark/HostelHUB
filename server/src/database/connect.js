import mongoose from 'mongoose';
import dotenv from 'dotenv';



dotenv.config();


mongoose.set("strictQuery",false);
mongoose.connect(process.env.DB_URL,{
})
    .then(()=>{
        console.log('Connected to DB.');
    })
    .catch((err)=>{
        console.log(err);
    });
    