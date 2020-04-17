import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import MessageInfo from "./messageInfo.js";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

export const MESSAGES = gql`
  query GetMessagesByIds($id: [ID]) {
    GetMessagesByIds(_id: $id) {
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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
    maxHeight: "75vh",
    overflow: 'auto',
  },
}));

export default function Messages (params) {
  const cls = useStyles();
  const { loading, error, data } = useQuery(MESSAGES, {
    variables: {
      "id": params.id
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <Container className={cls.root}>
    {data.GetMessagesByIds.map((message) => (
    <div key={message._id}>
      <MessageInfo params={message} />
    </div>
    ))}
  </Container>
  )
};