import React from 'react';
import MessageInfo from "./messageInfo.js";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
    maxHeight: "75vh",
    overflow: 'auto',
  },
}));

export default function Messages ({ params }) {
  const cls = useStyles();

  return (
    <Container className={cls.root}>
    {params.map((message) => (
    <div key={message._id}>
      <MessageInfo params={message} />
    </div>
    ))}
  </Container>
  )
};