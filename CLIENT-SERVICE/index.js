// client-service/index.js
const express = require('express');
const app = express();
app.use(express.json());

let clients = []; // Liste de clients (en mémoire)

// Endpoint pour obtenir tous les clients
app.get('/clients', (req, res) => {
    res.json(clients);
});

// Endpoint pour ajouter un client
app.post('/clients', (req, res) => {
    const client = { id: clients.length + 1, ...req.body };
    clients.push(client);
    res.status(201).json(client);
});

app.listen(3000, () => {
    console.log('Client Service is running on port 3000');
});
