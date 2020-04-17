import React, { useContext } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { ChatContext } from "./chatContext";
import Chat from './chat';

const NEW_CHAT = gql`
  query newChat($token: String) {
    newChat(token: $token) {
      _id 
      resolved 
      takeoverAgent 
      customer {
        _id
        name
      }
      supporter {
        _id
        name
      }
      token 
      createdAt
      updatedAt
    }
  }
`

const UserChatContextSetter = ({token}) => {

  let { state, dispatch } = useContext(ChatContext);

  const { loading, error, data } = useQuery(NEW_CHAT, {
    variables: {
      token
    },
    onCompleted(data) {
      const payload = data.newChat;
      dispatch({ type: "set", payload });
    }
  });
  return (null);
};

export default UserChatContextSetter;
