import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Messages from '../components/messages/messagesByToken';
import Paper from '@material-ui/core/Paper';
import { ChatContext } from '../components/chats/chatContext';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    height: '75vh',
    maxHeight: "75vh",
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
}));

export const MESSAGES = gql`
  query messagesByChat($chatId: ID) {
    messagesByChat(chatId: $chatId) {
      _id
      content
      sender {
        _id
        name
        user_type
      }
      createdAt
      updatedAt
    }
  }
`;

const Chat = () => {
  const cls = useStyles();
  let { state, dispatch } = useContext(ChatContext);
  const { loading, error, data } = useQuery(MESSAGES, {
    variables: {
      "chatId": state._id,
    },
    pollInterval: 500,
  });
  if (loading) return (
    <Paper square className={cls.root}>
      <div> Loading </div>
    </Paper>
  );
  if (error) return (
    <Paper square className={cls.root}>
      <div> No chat selected </div>
    </Paper>
  );
  
  return (
    <Paper square className={cls.root}>
      <Messages params={data.messagesByChat} />
    </Paper>
  )
}

export default Chat;