require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const app = express();
const config = require ('./config/keys');
const Registration = require('./models/Registration');


mongoose
  .connect(config.mongoURI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Flash Gordon just landed on Planet Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(
    session({
      secret: 'projectapp',
      cookie: {
        expire: 60000,
      },
      rolling: true,
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
    })
  );

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);


const dialogFlowRoutes = require('./routes/dialogFlowRoutes');
app.use('/', dialogFlowRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT);


//set GOOGLE_APPLICATION_CREDENTIALS=/mnt/c/users/Adão\ Coelho/code/mycodingjunk/shopreactserver/dialogflow-keys/tobyhawkagent-dxih-2be0764e43e3.json
