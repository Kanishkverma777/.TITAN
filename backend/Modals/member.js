const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    memberId: {
        type: String,
        unique: true,
        index: true
    },
    mobileNo: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    membership: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'membership',
        required: true
    },
    gym: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gym',
        required: true,
        index: true
    },
    profilePic: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Active",
        index: true
    },
    lastPayment: {
        type: Date,
        default: Date.now
    },
    nextBillDate: {
        type: Date,
        required: true,
        index: true
    }
}, { timestamps: true })

// Compound index for frequent filtering
memberSchema.index({ gym: 1, name: 'text', mobileNo: 1 });

const memberModel = mongoose.model("member", memberSchema);

module.exports = memberModel;