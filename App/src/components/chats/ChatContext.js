import React from 'react';

const ChatContext = React.createContext();

let initialState = {
  _id: '',
  chats: [],
  resolved: false,
  takeoverAgent: '',
  customer: '',
  supporter: '',
  token: '',
  createdAt: '',
  updatedAt: ''
}

let reducer = (state, action) => {
  switch (action.type) {
    case "reset":
      return initialState;
    case "resolve":
      return { ...state, ...action.payload, resolved: true, };
    case "set":
      return { ...state, ...action.payload };
    case "delete":
      return { ...state, ...action.payload };
    case "addMessage":
      return state.chats.push(action.payload._id);
    default:
      return state;
  }
};

function ChatContextProvider(props) {
  
  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };

  return (
    <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>
  );
}

let ChatContextConsumer = ChatContext.Consumer;

export { ChatContext, ChatContextProvider, ChatContextConsumer };