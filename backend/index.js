const express = require('express');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');

// Parse JSON request bodies
app.use(express.json());

let users = [];
let chats = [];
let mentors = [];

// Read the CSV file and store the data in an array of objects
fs.createReadStream('RegisterDB.csv')
    .pipe(csv())
    .on('data', (data) => {
        users.push(data);
    })
    .on('end', () => {
        console.log('register csv database file successfully processed');
    });

// Read the CSV file and store the data in an array of objects
fs.createReadStream('Chat.csv')
    .pipe(csv())
    .on('data', (data) => {
        chats.push(data);
    })
    .on('end', () => {
        console.log('chat csv database file successfully processed');
    });

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    const ws = fs.createWriteStream('RegisterDB.csv', { flags: 'a' });
    ws.write(`${newUser.fullName},${newUser.password}\n`);
    ws.end();
    res.json(users);
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.post('/api/mentors', (req, res) => {
    const newMentor = req.body;
    mentors.push(newMentor);
    const ws = fs.createWriteStream('MentorDB.csv', { flags: 'a' });
    ws.write(`${newMentor.fullName},${newMentor.password}\n`);
    ws.end();
    res.json(mentors);
});

app.get('/api/mentors', (req, res) => {
    res.json(mentors);
})


app.post('/api/chat', (req, res) => {
    const newMessage = req.body;
    chats.push(newMessage);
    const ws = fs.createReadStream('Chat.csv', { flags: 'a' });
    ws.write(`${newMessage.Text},${newMessage.byWho}\n`);
    ws.end();
    res.json(chats);
})



app.get('/api/chat', (req, res) => {
    res.json(chats);
});

app.get('/api/users/:fullName', (req, res) => {
    const fullName = req.params.fullName;
    const user = users.find(u => u.fullName === fullName);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Start the server on port 3002
app.listen(3002, () => {
    console.log('Server started on port 3002');
});
