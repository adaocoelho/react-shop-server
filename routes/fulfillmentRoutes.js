const {WebhookClient} = require('dialogflow-fulfillment');
const express = require('express')
const router = express.Router();



    router.post('/', async (req, res) => {
        const agent = new WebhookClient({ request: req, response: res });

        function beavis(agent) {
            agent.add(`Welcome to my Beavis fulfillment!`);
        }
        
             function fallback(agent) {
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }
        let intentMap = new Map();
        intentMap.set('beavis', beavis);

        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    });

module.exports=router;