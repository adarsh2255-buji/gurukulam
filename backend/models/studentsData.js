import mongoose from "mongoose";

const studentsDataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    },
    class: {
        type: String,
        required: true,
        enum: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', "XII"],
    },
    syllabus : {
        type: String,
        required: true,
        enum: ["State", "CBSE", "ICSE"]
    },
    medium : {
        type: String,
        required: true,
        enum: ["Malayalam", "English",]
    },
    schoolName : {
        type: String,
        required: true,
        set: (value) => value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    },
    dateOfBirth : {
        type: Date,
        required: true,
        validate: {
            validator: (v) => new Date() > v,
            message: "Date of birth must be in the past."
        }
    },
    fatherName : {
        type: String,
        required: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    },
    motherName : {
        type: String,
        required: true,
        set: (value) => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    },
    address : {
        type: String,
        required: true,
        set: (value) => value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
    },
    contactNumber : {
        type: String,
        required: true,
        validate: {
            validator: (v) => /\d{10}/.test(v),
            message: "Contact number must be 10 digits long."
        }
    },
    whatsAppNumber : {
        type: String,
        required: true,
        validate: {
            validator: (v) => /\d{10}/.test(v),
            message: "WhatsApp number must be 10 digits long."
        }
    },
    admissionNumber : {
        type: String, 
        unique: true,
    }
}, {timestamps : true });

const StudentData = mongoose.model("StudentData", studentsDataSchema);

export default StudentData;