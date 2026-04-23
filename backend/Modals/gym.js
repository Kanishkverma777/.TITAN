const mongoose = require("mongoose");

const gymSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: true,
    },
    gymName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: ""
    },
    contact: {
        type: String,
        default: ""
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date
    }
}, { timestamps: true })

// Index for performance
gymSchema.index({ userName: 1, email: 1 });

const modal = mongoose.model("gym", gymSchema);

module.exports = modal;