require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// connection database mongodb
mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
const db = mongoose.connection
// check connect database
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database '));

app.use(express.json());

// directory routes
const fruits = require('./routes/fruits');
app.use('/fruits', fruits);

app.listen(3000, () => console.log('Server Started'));