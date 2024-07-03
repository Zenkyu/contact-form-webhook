const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv').config({path: './.env.local'});

const app = express();
const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    try {
        await axios.post(DISCORD_WEBHOOK_URL, {
            content: `Nouveau message de ${name} (${email}):\n\n${message}`
        });
        res.status(200).json({ success: 'Message envoyé avec succès à Discord' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message à Discord:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi du message à Discord' });
    }
});

app.listen(PORT, () => {
    console.log(`Le serveur écoute sur le port ${PORT}`);
});