import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { UserContextConsumer } from '../../logic/user';

const  LoginButton = () => {
  let history = useHistory();

  const handleClick = (props) => {
    history.push("/protected");
  }

  return (
    <UserContextConsumer>
      {(prpos) => (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => handleClick(prpos)}
        >
          Sign In
        </Button>
      )}
    </UserContextConsumer>
  );
}

export default LoginButton;