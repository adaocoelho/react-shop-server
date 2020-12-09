const chatbot = require("../chatbot/chatbot");
const express = require('express')
const router = express.Router();

/*module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send({ hello: "Johnny Bravo" });
  });*/

  router.post("/api/text-query", async (req, res) => {
    let responses = await chatbot.textQuery(req.body.text, req.body.cookiesId, req.body.parameters);
    //console.log(responses);
    res.send(responses[0].queryResult);
  });

  router.post("/api/event-query", async (req, res) => {
    let responses = await chatbot.eventQuery(
      req.body.event,
      req.body.cookiesId,
      req.body.parameters
    );
    res.send(responses[0].queryResult);
  });



module.exports = router