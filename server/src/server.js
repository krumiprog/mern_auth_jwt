require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./router');

const PORT = process.env.PORT || 5000;

mongoose.connect(
  process.env.MONGO_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  error => {
    if (error) return console.error(error);
    console.log('Mongo connected');
  }
);

const app = express();

const options = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(options));
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listens on port ${PORT}...`);
});
