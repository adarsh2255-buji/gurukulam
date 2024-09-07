import mongoose from "mongoose";

//schema for individual subjects' mark

const markSchema = new mongoose.Schema({
    subject : {
        type : String,
        required : true,
    },
    markObtained : {
        type : Number,
        required : true,
    },
    maxMark : {
        type : Number,
        required : true,
    }
})

//schema for the mark list for each student
const markListSchema = new mongoose.Schema({
    studentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "StudentData",
        required : true
    },
    examName : {
        type : String,
        required : true,
    },
    examDate: { 
        type : Date,
        required : true,
    },
    marks : [markSchema], // array of subject marks
    totalMarksObtained : {
        type : Number,
        required : true,
    },
    percentage : {
        type : Number,
        required : true,
    },
    averageMark : {
        type : Number,
        required : true,
    }
},{timestamps : true })

const MarkList = mongoose.model("MarkList", markListSchema);

export default MarkList;