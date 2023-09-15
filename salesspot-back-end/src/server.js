import express from 'express';

const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});