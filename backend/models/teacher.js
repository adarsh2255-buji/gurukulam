import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    }, 
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        match : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
    },
    role : {
        type : String,
        default :'teacher',
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
},{timestamps : true });

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;