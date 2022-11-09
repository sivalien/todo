const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv/config')
const todoRoutes = require('./routes/todoRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express();
const port = process.env.PORT || 5050;

const cors = require('cors')
app.options('*', cors()) 
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin',  '*');
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
app.use('/auth', authRoutes)
app.use('/', todoRoutes)

mongoose.connect(process.env.DB_URI,
  { useNewUrlParser: true, 
    useUnifiedTopology: true})
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));

app.listen(port, () => console.log(`Listening on port ${port}`));