const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var cors = require('cors')
require('dotenv/config')
const todoRoutes = require('./routes/todoRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express();
const port = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/auth', authRoutes)
app.use('/', todoRoutes)

mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true, 
    useUnifiedTopology: true})
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

app.listen(port, () => console.log(`Listening on port ${port}`));