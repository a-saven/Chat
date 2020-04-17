import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Router from "./router";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { UserContextProvider } from "./logic/user.js";

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';


const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0b693a"
    }
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <UserContextProvider>
          <Router />
        </UserContextProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

render(<App />, document.getElementById("root"));
