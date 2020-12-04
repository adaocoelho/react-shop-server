const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
require("./routes/dialogFlowRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//set GOOGLE_APPLICATION_CREDENTIALS=/mnt/c/users/Adão\ Coelho/code/mycodingjunk/shopreactserver/dialogflow-keys/tobyhawkagent-dxih-2be0764e43e3.json
