const dialogflow = require("dialogflow");
const config = require("../config/keys");

const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(
  config.googleProjectID,
  config.dialogFlowSessionID
);

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send({ hello: "Johnny" });
  });

  app.post("/api/text-query", async (req, res) => {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: "Where is Toby?",
          // The language used by the client (en-US)
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };

    let responses = await sessionClient.detectIntent(request);
    //console.log(responses);
    res.send(responses[0].queryResult);
  });

  app.post("/api/event-query", (req, res) => {
    res.send("event query");
  });
};
