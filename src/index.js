const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const app = express();

mongoose
  .connect(
    'mongodb+srv://root:coderhouse@cluster0.znqdu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => {
    app.use('/api/health', (req, res) => {
      res.status(200).send({ message: 'OK!' });
    });

    //definición de middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(config.port, () => {
      console.log(`Estamos escuchando en está url: ${config.port}`);
    });
  });
