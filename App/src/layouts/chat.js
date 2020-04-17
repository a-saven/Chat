import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Messages from '../components/messages/messagesByChat';
import Paper from '@material-ui/core/Paper';
import { ChatContext } from '../components/chats/chatContext';

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

const Chat = (id) => {
  const cls = useStyles();
  let { state, dispatch } = useContext(ChatContext);
  const messageId = state.chats ? state.chats.map(m => m._id) : false;
  return (
    <Paper square className={cls.root}>
      { messageId ? <Messages id={messageId}/> : <p>Empty</p> }
    </Paper>
  )
}

export default Chat;