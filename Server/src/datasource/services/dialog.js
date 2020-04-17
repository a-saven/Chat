import config from '../keys/creds.json'
import { LANGUGE_CODE } from '../keys/constants'
import dialogflow from 'dialogflow'
import uuid from 'uuid'
import { fillResponseData } from './fillData'
import _ from "lodash";
import decode from '../../utils/decoder'

class DialogService {
  static async intenApi({text, req}) {
    //Set env variable to corresponding value in creds.json
    process.env.GOOGLE_APPLICATION_CREDENTIALS = config[req.session.projectId];
    //Sets up dialogflow client
    const sessionClient = new dialogflow.SessionsClient();
    const sessionId = uuid.v4();
    const session = sessionClient.sessionPath(req.session.projectId, sessionId);
    const request = {
      session,
      queryInput: {
        text: {
          text,
          languageCode: LANGUGE_CODE
        }
      },
      queryParams: {
        contexts: req.session.contexts
      }
    };

    try {
      const response = await sessionClient.detectIntent(request);
      return response;
    } catch (e) {
      console.log('Dialgflow detectIntenApi error', e);
    }
  }

  static async sessionManagement ( text, patient_token, req) {
    req.session ? null : req.session = {};
    req.session.test = "test";
    req.session.token = patient_token;
    if (!req.session.projectId) {
      req.session.projectId = "botrouter-ysxrwg";
      req.session.contexts = [];
    } else if (text.startsWith("!@#")) {
      req.session.projectId = text.substring(3);
      text = "hi";
    } else if (!text || !text.length) {
      return;
    } 
    return { text, req };
  }

  static preFormat (response) {
    const contexts = response[0].queryResult.outputContexts;
    // @Converts data from protobuf to json
    const message = response[0].queryResult.fulfillmentMessages[0];
    const intent = decode.structProtoToJson(message.payload);
    const data = message.message === 'payload' ? JSON.stringify(intent) : JSON.stringify({responses:[message.text]});
    const context = JSON.stringify(contexts);
    // refactor with fillPatientData
    return { data, context }
  }

  static async getPatienData (patient_token, dataSources) {
    // const patient = await dataSources.profileAPI.findProfile();
    // console.log('patient', patient)
    // patient.medications = medications;
    // patient.goals = goals;
    return {
      medications: [],
      goals: []
    };
  }

  static async botMessage ( text, patient_token, req, dataSources) {
   const check = await this.sessionManagement(text, patient_token, req);
   const response = await this.intenApi(check);
    //console.log('dialog service bot response', response);///<==== POINT ALPHA
    const preFormat = this.preFormat(response);
    // @Updates session contexts for future requests
    req.session.contexts = preFormat.contexts
    const patient = await this.getPatienData(patient_token, dataSources);
    const filled = fillResponseData(preFormat, patient, text);
    const { data } = filled 
    console.log("filled", data)
    return data;
  }
}

export default DialogService;