const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
