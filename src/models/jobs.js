const mongoose = require("mongoose");
require("dotenv").config();
const validator = require("validator");

const { Schema } = mongoose;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 40,
    },
    jobType: {
        type: String,
        required: true,
        enum: {
            values: ["Full-Time", "Part-Time", "Remote", "Internship"],
            message: "{VALUE} is not supported",
        },
    },
    jobDescription: {
        type: String,
        trim: true,
        maxLength: 300,
        default: "We are looking for a React Developer",
    },
    salary: {
        type: String,
        required: true,
        enum: {
            values: [
                "Under $50K",
                "$50K-$60K",
                "$60K-$70K",
                "$70K-$80K",
                "$80K-$90K",
                "$90K-$100K",
                "$100K-$125K",
                "$125K-$150K",
                "$150K-$175K",
                "$175K-$200K",
                "Over $200K",
            ],
            message: "{VALUE} is not supported",
        },
    },
    location: {
        type: String,
        trim: true,
        required: true,
        maxLength: 50,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    companyDescription: {
        type: String,
        trim: true,
        maxLength: 300,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: 80,
        immutable: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid E-mail Id: " + value);
            }
        },
    },
    phone: {
        type : String,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value, ['en-US', 'en-IN'])) {
                throw new Error("Invalid Phone number: "+ value);
            }
        }
    }
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;