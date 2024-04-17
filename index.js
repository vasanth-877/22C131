const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Grade = require('./Grade'); 
const app = express();
const PORT = process.env.PORT || 5000; 
app.use(bodyParser.json());
app.get('/grades', async (req, res) => {
    try {
        
        const grades = await Grade.find();

        res.status(200).json(grades); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.put('/grades/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { studentName, subject, score } = req.body;
        if (!studentName || !subject || !score) {
            return res.status(400).json({ error: 'Please provide student name, subject, and score' });
        }
        const updatedGrade = await Grade.findByIdAndUpdate(id, {
            studentName,
            subject,
            score
        }, { new: true });
        if (!updatedGrade) {
            return res.status(404).json({ error: 'Grade not found' });
        }
        res.status(200).json(updatedGrade); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/grades', async (req, res) => {
    try {
        const { studentName, subject, score } = req.body;
        if (!studentName || !subject || !score) {
            return res.status(400).json({ error: 'Please provide student name, subject, and score' });
        }
        const newGrade = new Grade({
            studentName,
            subject,
            score
        });
        const savedGrade = await newGrade.save();
        res.status(201).json(savedGrade); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.delete('/grades/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGrade = await Grade.findByIdAndDelete(id);
        if (!deletedGrade) {
            return res.status(404).json({ error: 'Grade not found' });
        }
        res.status(200).json({ message: 'Grade deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
mongoose.connect('mongodb://localhost:27017/Gradesystem')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
