const mongoose=require('mongoose');
const statusSchema=new mongoose.Schema({
    handle:String,
    message:String
})

const Status=mongoose.model('status',statusSchema);
module.exports =Status;
