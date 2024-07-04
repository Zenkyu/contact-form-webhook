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

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailLocalPart = email.split('@')[0];

    if (!email || !emailRegex.test(email) || emailLocalPart.length > 64) {
        return res.status(400).json({ error: "L'adresse email est invalide ou dépasse 64 caractères avant le @" });
    }

    // Validation du nom
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,32}$/;
    if (!name || !nameRegex.test(name)) {
        return res.status(400).json({ error: "Le nom est invalide ou dépasse 32 caractères, ou contient des caractères spéciaux non autorisés" });
    }

    // Validation du message
    if (!message || message.length > 1000) {
        return res.status(400).json({ error: `Le message dépasse ${maxMessageLength} caractères` });
    }

    try {

        const embed = {
            description: message,
            author: {
                name: `${name} (${email})`
            },
            title: "Nouveau Message",
            color: 12320768,
            timestamp: new Date().toISOString()
        };

        await axios.post(DISCORD_WEBHOOK_URL, {
            embeds: [embed]
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