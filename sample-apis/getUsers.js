const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'Ashis' },
        { id: 2, name: 'Vishnu' }
    ]);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
