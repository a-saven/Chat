import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Moment from "react-moment";
import Username from "./username";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { ChatContext } from './chatContext';


const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: "90%",
    height:'100%',
    fontSize: '12px'
  },
  avatar: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    height: '4.5vh',
    width: '4.5vh',
  },
}));


const Chat = ({params}) => {
  const c = params;
  const cls = useStyles();

  let { state, dispatch } = useContext(ChatContext);

  const handleClick = () => {
    const payload = c
    dispatch({type: 'set', payload});
  }

  if (!c) return ( <Paper className={cls.main}></Paper>)
  return (
    <Paper className={cls.main} key={c._id} onClick={handleClick}>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar className={cls.avatar} src='images/avatars/chatBot.png' />
        </Grid>
        <Grid item xs={12} sm container direction="column" justify="center" >
          <div>
            Customer: <Username id={c.customer._id} />
          </div>
          <div>
            Supporter:  <Username id={c.supporter._id} />
          </div>
          <div>
            UpdatedAt: <Moment format="D MMM YYYY" unix>{c.updatedAt/1000}</Moment>
          </div>
        </Grid>
      </Grid>
    </Paper>
  )
};

export default Chat;