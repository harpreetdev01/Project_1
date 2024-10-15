import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-Parser';
import Colors from './colorSlider'; // Import model

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/colorsDB', {
    useNewURLParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB', err));

// Route to save color data
app.post('/api/colors', async(req, res) => {

    try {
        const colorData = new Colors({
            red: red,
            green: green,
            blue: blue
        });

        const savedColor = await colorData.save();
        res.status(200).save();
        res.status(200).json({ message: 'Colors saved successfully', data: savedColor });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save colors', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})