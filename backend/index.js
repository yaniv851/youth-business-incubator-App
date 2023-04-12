const express = require('express');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');

// Parse JSON request bodies
app.use(express.json());

let users = [];

// Read the CSV file and store the data in an array of objects
fs.createReadStream('RegisterDB.csv')
    .pipe(csv())
    .on('data', (data) => {
        users.push(data);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    const ws = fs.createWriteStream('RegisterDB.csv', { flags: 'a' });
    ws.write(`${newUser.fullName},${newUser.gmail},${newUser.password}\n`);
    ws.end();
    res.json(users);
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

// Start the server on port 3002
app.listen(3002, () => {
    console.log('Server started on port 3002');
});
