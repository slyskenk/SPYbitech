// server.js
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        res.json({ text });
    } catch (error) {
        console.error('Error with Gemini API:', error);
        res.status(500).json({ text: "Sorry, I'm unable to process that request right now." });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});