import { DataSource } from 'apollo-datasource';
import DialogService from './services/dialog'

export default class Messages extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateMessage({ id: id } = {}) {
    const messages = await this.store.Message.findOrCreate({ where: { email } });
    return messages;
  }

  async sendMessage({content, sender, chat_token, type, chatId, req}) {
    let message = new this.store.Message({
      content,
      sender,
      chat_token,
      chatId
    })
    if(type === 'protected') message.sender = "5d967e3082212f097b74ff36"
    try {
      let savedMessage = await message.save()
      if(type === 'protected') return savedMessage;
      const botText = await DialogService.botMessage(content, 'ca63c75d91e263ba5e3047add7e3b1df27', req);
      //console.log('botText', botText);
      let botMessage = new this.store.Message({
        content: botText,
        sender: "5d967e3082212f097b74ff36",
        chat_token,
        chatId
      })
      botMessage.save();
      //Denormalized data
      //let chat = await this.store.Chat.updateOne({_id: chat_token}, {$push: {chats: [savedMessage._id, botMessage._id]}});
      return savedMessage;
    } catch (e) {
      console.error(e)
    }
  }

  async findMessages(params) {
    const messages = await this.store.Message.find({_id: {$in: params._id}}).sort({ createdAt: 'desc' });
    return messages;
  }

  async messagesByChatId({chatId}) {
    const messages = await this.store.Message.find({chatId}).sort({ createdAt: 'desc' });
    return messages;
  }

  async findOneMessage(params) {
    const message = await this.store.Message.findOne(params);
    return message;
  }

  async findChats(params = {}) {
    const chats = await this.store.Chat.find(params);
    return chats;
  }

  async findOneChat(params) {
    const chat = await this.store.Chat.findOne({ _id: "5d9b16d475afebf853586c65" });
    return chat;
  }

  async updateChat(args) {
    const { agent_id, token } = args;
    const chat = await this.store.Chat.findOneAndUpdate({ token }, { supporter: agent_id, takeoverAgent: 1 });
    return chat;
  }

  async createChat(id) {
    const chat = new this.store.Chat({
      resolved: false,
      takeoverAgent: 0,
      customer: id,
      supporter: "5d967e3082212f097b74ff36",
      token: "rxnnf2ykt4i0z69wedvz1j86mnpvlt8u",
    })
    chat.save();
    return chat;
  }
}
