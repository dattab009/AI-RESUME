const mongoose = require("mongoose");

const interviewQuestionSchema =
    new mongoose.Schema(
        {
            question: {
                type: String,
                required: true
            },

            answer: {
                type: String,
                default: ""
            },

            score: {
                type: Number,
                default: 0,
                min: 0,
                max: 10
            },

            feedback: {
                type: String,
                default: ""
            }
        },
        {
            _id: false
        }
    );


const interviewSchema =
    new mongoose.Schema(
        {
            user: {
                type:
                    mongoose.Schema.Types.ObjectId,

                ref: "User",

                required: true
            },

            role: {
                type: String,

                required: true,

                trim: true
            },

            questions: {
                type:
                    [interviewQuestionSchema],

                default: []
            },

            totalScore: {
                type: Number,

                default: 0
            },

            averageScore: {
                type: Number,

                default: 0
            },

            completed: {
                type: Boolean,

                default: false
            }
        },
        {
            timestamps: true
        }
    );


module.exports =
    mongoose.model(
        "Interview",
        interviewSchema
    );