import DialogService from './services/dialog'
import { User, Chat, Chatroom } from '../models'
import { PubSub } from 'apollo-server'

const pubsub = new PubSub();
const CHAT_CREATED = 'CHAT_CREATED';

class DialogFlowAPI {
  async botMessage ({ text, patient_token, chatroom_token, contexts, title}, req) {
    // try {
    //   // @save customer message in Chat table
    //   const relatedUser = await User.findOne({ token: patient_token });
    //   const relatedChatroom = await Chatroom.findOne({ token: chatroom_token })
    //   // const chatroom = await Chatroom.findOne({ customer: relatedUser._id });
  
    //   // @check if request is the first chat for user and relevant to chatroom
    //   if (relatedChatroom.chats.length !== 0) {
    //     const msgFromCustomer = new Chat({
    //       content: title ? title : text,
    //       sender: relatedUser
    //     })
    //     const customerChatInstance = await msgFromCustomer.save();
    //     relatedUser.chats.push(customerChatInstance);
    //     await relatedUser.save();

    //     // @save customer message in Chatroom table
    //     relatedChatroom.chats.push(customerChatInstance);
    //     await relatedChatroom.save();

    //     // @send customer message and token to admin
    //     // const { token } = relatedUser;
    //     await pubsub.publish(CHAT_CREATED, { 
    //       chatCreated: { 
    //         owner: 'customer', 
    //         // content: text, 
    //         // img: 'resources/images/avatars/1.jpg',
    //         // token 
    //       } 
    //     });
    //   }

    //   if (relatedChatroom.takeoverAgent === 1) {
    //     // @stop bot response
    //     return {}
    //   } else {
        // @fetch bot message from dialogflow
        req.session.test = "test";
        req.session.token = patient_token;
     
        const response =  await DialogService.botMessage( text, patient_token, req);
        let { data, context } = response;
        // @Updates session contexts for future requests
        req.session.contexts = JSON.parse(context);
        // @Adds user information to default response
        // @save bot message in Chat Table 
        const botInstance = await User.findOne({user_type : 2});
        const msgFromBot = new Chat({ 
          content: data, 
          sender: botInstance
        })
        const botChatInstance = await msgFromBot.save();
        botInstance.chats.push(botChatInstance);
        await botInstance.save();
        // @save bot message in Chatroom Table
        relatedChatroom.chats.push(botChatInstance);
        await relatedChatroom.save();
        
        // @send bot message to admin panel
        await pubsub.publish(CHAT_CREATED, { 
          chatCreated: { 
            owner: 'bot'
          } 
        });
 
        context = '[]'; // no used context on client, can be provided
        return { data, context }         
      };
    }

export default DialogFlowAPI;

// function messageFormat (message) {
//   if(!message) {return message};
//   if(message[0] === '{') {
//     let text = '';
//     const msgJSON = JSON.parse(message);
//     console.log('msgJSON', msgJSON)
//     if(msgJSON.responses) {
//       msgJSON.responses.forEach((m) => {
//        if(typeof m.text === "string") {
//         text = text.concat('\n', m.text)
//        }
//        if(typeof m.text === "object") {
//         text = text.concat('\n', m.text[0])
//        }
//       });
//       return text;
//     } 
//   } 
//   return message;
// }