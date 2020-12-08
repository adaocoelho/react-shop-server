'use strict';
const dialogflow = require('dialogflow');
const structjson = require('./structjson.js');
const config = require('../config/keys');


const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

const credentials = {
    client_email: config.googleClientEmail,
    private_key:
    config.googlePrivateKey,
};

const sessionClient = new dialogflow.SessionsClient({projectId, credentials});

const Registration = require('../models/Registration');




module.exports = {

    /*getToken: async function() {
        return new Promise((resolve) => {
            googleAuth.authenticate(
                {
                    email: config.googleClientEmail,
                    key: config.googlePrivateKey,
                    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
                },
                (err, token) => {
                    resolve(token);
                },
            );
        });
    },*/

    textQuery: async function(text, cookiesId, parameters = {}) {
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(projectId, sessionId + cookiesId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: languageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;



    },

    eventQuery: async function(event, cookiesId,  parameters = {}) {
        let self = module.exports;
        let sessionPath = sessionClient.sessionPath(projectId, sessionId + cookiesId);

        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters), //Dialogflow's v2 API uses gRPC. You'll need a jsonToStructProto method to convert your JavaScript object to a proto struct.
                    languageCode: languageCode,
                },
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = self.handleAction(responses);
        return responses;

    },


    handleAction: function(responses){
       let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'skateclass-yes':
                if (queryResult.allRequiredParamsPresent) {
                    self.saveRegistration(queryResult.parameters.fields); //parametros dialogflow
                }
                break;
        }

        //console.log(queryResult.action);
        //console.log(queryResult.allRequiredParamsPresent);
            //console.log(queryResult.fulfillmentMessages);
            //console.log(queryResult.parameters.fields);

        return responses;
    },

    //save to data from toby
    saveRegistration: async function(fields){
        const registration = new Registration({
            name: fields.name.stringValue, //mm estrutura que o frontend!
            phone: fields.phone.stringValue,
            email: fields.email.stringValue,
            dateSent: Date.now()
        });
        try{
            let reg = await registration.save();
            console.log(reg);
        } catch (err){
            console.log(err);
        }
    }
}