import React, { useContext } from "react";
import { gql } from "apollo-boost";
import { ChatContext } from "./chatContext";
import Chat from './chat';
import { useMutation } from '@apollo/react-hooks';

const NEW_CHAT = gql`
  mutation newChat($token: String) {
    newChat(token: $token) {
      _id 
      resolved 
      takeoverAgent 
      customer {
        _id
      }
      supporter {
        _id
      }
      token 
      createdAt
      updatedAt
    }
  }
`

const NewChat = ({token}) => {
  let { state, dispatch } = useContext(ChatContext);
  const [newChat, { chatData }] = useMutation(
    NEW_CHAT,
    {
      variables: { 
         token
      },
      onCompleted(data) {
        console.log('data', data)
     
        const payload = data.newChat;
        dispatch({ type: "set", payload });
        return (null);
      }
    });

    newChat();
    return (null)
};

export default NewChat;