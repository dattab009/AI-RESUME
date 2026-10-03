const mongoose = require("mongoose");

const skillGapSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        targetRole: {
            type: String,
            required: true,
            trim: true
        },

        currentSkills: {
            type: [String],
            default: []
        },

        requiredSkills: {
            type: [String],
            default: []
        },

        missingSkills: {
            type: [String],
            default: []
        },

        skillGapPercentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        recommendations: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "SkillGap",
        skillGapSchema
    );