const chatbot = require("../chatbot/chatbot");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send({ hello: "Johnny Bravo" });
  });

  app.post("/api/text-query", async (req, res) => {
    let responses = await chatbot.textQuery(req.body.text, req.body.userID, req.body.parameters);
    //console.log(responses);
    res.send(responses[0].queryResult);
  });

  app.post("/api/event-query", async (req, res) => {
    let responses = await chatbot.eventQuery(
      req.body.event,
      req.body.userID,
      req.body.parameters
    );
    res.send(responses[0].queryResult);
  });
};
