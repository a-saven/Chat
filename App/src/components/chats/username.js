import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const USERS = gql`{
  users {
    _id
    name,
    user_type,
    email,
    img,
    token,
    chats {
      _id
    }
  }
}`;


const Username = ({id}) => {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error :(</span>;
  if(id) {
    const user = data.users.find(e => e._id == id)
    return user.name
  }

  return (
   <span>Name</span>
  )
}

export default Username;
