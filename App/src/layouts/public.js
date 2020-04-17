import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import AppBar from '../components/common/appBar';
import UserInput from '../components/common/userInput';
import Chat from './userChat'
import { ChatContextProvider } from '../components/chats/chatContext';
import  UserChatContextSetter from '../components/chats/userChatContextSetter';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  central: {
    direction: "column",
    justify: "space-between",
    alignItems: "center",
  }
}));


const Public = () => {
  const cl = useStyles();
  const history = useHistory();
  const token = history.location.pathname.substring(1);

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <AppBar />
      <ChatContextProvider>
        <Grid container className={cl.central} spacing={2}>
          <Grid item xs={12}>
            <UserChatContextSetter token={token} />
            <Chat />
          </Grid>
          <Grid item xs={12}>
            <UserInput />
          </Grid>
        </Grid>
      </ChatContextProvider>
    </Container>
  );
};

export default Public;