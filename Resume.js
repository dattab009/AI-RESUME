const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },

        fileName: {
            type: String,
            required: true
        },

        resumeText: {
            type: String,
            required: true
        },

        score: {
            type: Number,
            default: 0
        },

        skills: {
            type: [String],
            default: []
        },

        wordCount: {
            type: Number,
            default: 0
        }
    },

    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "Resume",
        resumeSchema
    );