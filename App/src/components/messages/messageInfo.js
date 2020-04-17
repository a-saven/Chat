import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { ChatContext } from '../chats/chatContext';
import { useHistory } from "react-router-dom";
import { MESSAGES } from '../messages/messagesByChat.js'

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

const toJSON = (message) => {
  if(!message) {return message};

  if(message[0] === '{') {
  const msgJSON = JSON.parse(message);
  return msgJSON.responses[0] || "Empty" 
  }

  if(message[0]) {
    return {text: message}
  }
}

const useStyles = makeStyles(theme => ({
  message: {
    margin: theme.spacing(0.3),
    padding: theme.spacing(0.3),
    minWidth: "60%",
    maxWidth: "80%",
    borderRadius: theme.spacing(1),
    fontSize: '12px',
  },
  button: {
    fontSize: '12px',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttons: {
    justifyContent: "center"
  }
}));

const Message = ({ params }) => {
  const classes = useStyles();
  const history = useHistory();
  const type = history.location.pathname.substring(1);
  const agent = params.sender.user_type === 2 ? "flex-start" : "flex-end";
  const msg = toJSON(params.content);

  let { state, dispatch } = React.useContext(ChatContext);

  const [sendMessage, { data }] = useMutation(
    SEND_MESSAGE,
    {
      refetchQueries: [{
        query: MESSAGES,
      }],
    }
  );
 
  const handleClick = (e) => {
    e.preventDefault();
    const { title, value, textContent } = e.currentTarget;
    console.log('e', title, value, textContent)
    sendMessage({variables: { 
      content: textContent, 
      sender: state.customer._id,
      chat_token: state.token,
      chatId: state._id,
      type
    }})
    
  }

  return (
    <Grid container justify={agent} className={classes.container}>
      <Paper className={classes.message} id={params._id}>
          <p>{msg.text}</p>
          <div className={classes.buttons}>
          {
            msg.buttons ? msg.buttons.map((b, i) => (
                <Button className={classes.button} key={i} title={b.text} onClick={handleClick} variant="outlined" color="primary">{b.title}</Button>
            )) : (null)
          }
         </div>
      </Paper>
    </Grid>
  );
};


export default Message;