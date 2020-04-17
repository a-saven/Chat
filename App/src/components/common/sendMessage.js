import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import { MESSAGES } from '../messages/messagesByChat.js'
import { ChatContext } from '../chats/chatContext';
import { useHistory } from "react-router-dom";

const SEND_MESSAGE = gql`
  mutation SEND_MESSAGE( $content: String, $sender: ID, $chat_token: String, $type: String, $chatId: String) {
    sendMessage( content: $content, sender: $sender, chat_token: $chat_token, type: $type, chatId: $chatId) {
      content
      _id
      sender {
        _id
      }
    }
  }
`;

export default function SendMessage({ content, clearInput }) {
  const history = useHistory();
  const type = history.location.pathname.substring(1);

  let { state, dispatch } = React.useContext(ChatContext);

  const [sendMessage, { data }] = useMutation(
    SEND_MESSAGE,
    {
      variables: { 
        content, 
        sender: state.customer._id,
        chat_token: state.token,
        chatId: state._id,
        type
      },
      refetchQueries: [{
        query: MESSAGES,
      }],
      onCompleted (data) {
        clearInput()
      }
    }
  );

  if(data && data._id) {
    const payload = { id: data._id }
    dispatch({ type: 'addMessage', payload })
  }
 
  return  (
      <Button  type="submit" variant="contained" color="primary" onClick={sendMessage} data-testid="post-button">
        Submit
      </Button>
    );
}
