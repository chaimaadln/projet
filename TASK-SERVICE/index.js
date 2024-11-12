// task-service/index.js
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

let tasks = []; // Liste des tâches (en mémoire)

// Endpoint pour obtenir toutes les tâches
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Endpoint pour ajouter une tâche associée à un client
app.post('/tasks', async (req, res) => {
    const { clientId, description } = req.body;

    try {
        // Vérification si le client existe
        const clientResponse = await axios.get(`http://client-service:3000/clients`);
        const clientExists = clientResponse.data.some(client => client.id === clientId);

        if (!clientExists) {
            return res.status(404).json({ error: 'Client not found' });
        }

        const task = { id: tasks.length + 1, clientId, description };
        tasks.push(task);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error connecting to Client Service' });
    }
});

app.listen(3001, () => {
    console.log('Task Service is running on port 3001');
});
