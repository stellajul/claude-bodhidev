// JavaScript Document
// server.js
const express = require('express');
const cors = require('cors');
const { Configuration, AnthropicClient } = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://bodhidev.fr' // Autorise uniquement votre domaine
}));

const anthropic = new AnthropicClient({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/chat', async (req, res) => {
    try {
        const response = await anthropic.messages.create({
            model: 'claude-3-sonnet-20240229',
            max_tokens: 1024,
            messages: [{ 
                role: 'user', 
                content: req.body.message 
            }],
            system: "Tu es un assistant francophone amical et professionnel."
        });

        res.json({ message: response.content[0].text });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ error: 'Erreur lors de la communication avec Claude' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});