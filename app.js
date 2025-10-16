const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(express.json());

// GET /users
app.get('/users', (req, res) => {
    const users = readUsers();
    res.json(users);
});

// POST /users
app.post('/users', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).json({ error: 'Name and age are required' });
    }
    const users = readUsers();
    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    const newUser = { id: newId, name, age };
    users.push(newUser);
    writeUsers(users);
    res.status(201).json(newUser);
});

// PUT /users/:id
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, age } = req.body;
    const users = readUsers();
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    if (name) user.name = name;
    if (age) user.age = age;
    writeUsers(users);
    res.json(user);
});


app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    let users = readUsers();
    const initialLength = users.length;
    users = users.filter(u => u.id !== userId);
    if (users.length === initialLength) {
        return res.status(404).json({ error: 'User not found' });
    }
    writeUsers(users);
    res.json({ message: 'User deleted successfully' });
});

app.get('/users/search', (req, res) => {
    const keyword = req.query.name;
    if (!keyword) {
        return res.status(400).json({ error: 'Query parameter name is required' });
    }
    const users = readUsers();
    const filtered = users.filter(u => 
        u.name.toLowerCase().includes(keyword.toLowerCase())
    );
    res.json(filtered);
});

app.listen(PORT, () => {
    console.log(`Server running `);
});


