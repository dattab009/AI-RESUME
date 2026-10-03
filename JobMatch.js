const mongoose = require("mongoose");

const jobMatchSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume"
        },

        jobTitle: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            default: ""
        },

        jobDescription: {
            type: String,
            default: ""
        },

        matchedSkills: {
            type: [String],
            default: []
        },

        missingSkills: {
            type: [String],
            default: []
        },

        matchPercentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "JobMatch",
        jobMatchSchema
    );