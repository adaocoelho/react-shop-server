require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const app = express();
const config = require("./config/keys");
const Registration = require("./models/Registration");
const User = require('./models/User')

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Flash Gordon just landed on Planet Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "projectapp",
    cookie: {
      expire: 60000,
    },
    rolling: true,
  })
);

app.use(cors());

/*app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
    })
  );*/


  /*app.get('*', function (req, res) {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
  });*/

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const dialogFlowRoutes = require("./routes/dialogFlowRoutes");
app.use("/", dialogFlowRoutes);

const fulfillmentRoutes = require("./routes/fulfillmentRoutes");
app.use("/", fulfillmentRoutes);


/*if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('dist/build'));

const path = require("path");
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'build', 'index.html'));
});
}*/

/*if (process.env.NODE_ENV === "production") {
app.get("*", (req,res) =>{
  if (req.originalUrl.startsWith('/api')) {
      // skip any /api routes
      next();
  } else {
    express.static(path.join(__dirname, '../dist/index.html'));
  }
})
}*/

app.get('/', (req,res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

/*if (process.env.NODE_ENV === "production") {
  app.use(express.static("./dist/build")); // js and css files
  // index.html for all page routes
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'));
  });
}*/

/*express.static(path_join(__dirname, '../dist/build'));*/

/*app.use("/", express.static(path.join(__dirname, "dist")));*/

const PORT = process.env.PORT || 5000
app.listen(PORT);


//set GOOGLE_APPLICATION_CREDENTIALS=/mnt/c/users/Adão\ Coelho/code/mycodingjunk/shopreactserver/dialogflow-keys/tobyhawkagent-dxih-2be0764e43e3.json

