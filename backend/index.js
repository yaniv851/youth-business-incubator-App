const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
    // Handle GET request for /api/users
});

app.listen(3002, () => {
    console.log('Server started on port 3002');
});