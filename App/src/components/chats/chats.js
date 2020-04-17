import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Chat from './chatInfo';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const CHATS = gql`
  {
    getAllChats {
      chats {
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
  }`;

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    overflow: "auto",
    flexDirection: 'column',
    alignItems: 'center',
    overflow: "auto",
    height: "62vh"
  },
}));

export default function Chats() {
  const cl = useStyles();
  const { loading, error, data, fetchMore } = useQuery(CHATS, {pollInterval: 1000});
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error :(</div>;

  return (
    <Grid className={cl.paper}>
      {data.getAllChats.chats.map((params) => (
        <Chat params={params} key={params._id}/>
      ))}
    </Grid>
  )
}
