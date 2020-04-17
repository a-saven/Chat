import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
//For testing only
import Grid from '@material-ui/core/Grid';
import AppBar from '../components/common/appBar';
import UserInput from '../components/common/userInput';
import Tabs from '../components/management/tabs';
import Chat from './userChat'
import { ChatContextProvider } from '../components/chats/chatContext';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: "auto",
    height: "75vh",
    maxHeight: "75vh",
    maxWidth: "100%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  central: {
    direction: "row",
    justify: "space-between",
    alignItems: "center",
  }
}));

const Protected = () => {
  const cl = useStyles();
  
  return (
      <Container component="main" maxWidth="xl">
        <CssBaseline />
        <AppBar/>
        <ChatContextProvider>
         <Grid container className={cl.central} spacing={2}>
          <Grid item xs={4}>
              <Tabs/>
          </Grid>
          <Grid item xs={8}>
              <Chat />
          </Grid>
        </Grid>
        <Grid item>
          <UserInput/>
        </Grid>
        </ChatContextProvider>
    </Container>
  )
}

export default Protected;