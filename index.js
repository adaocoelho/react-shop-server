const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose     = require('mongoose');
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



app.use(bodyParser.json());
require("./routes/dialogFlowRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);


//set GOOGLE_APPLICATION_CREDENTIALS=/mnt/c/users/Adão\ Coelho/code/mycodingjunk/shopreactserver/dialogflow-keys/tobyhawkagent-dxih-2be0764e43e3.json
