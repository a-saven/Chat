import React from 'react';
import Login from './pages/login';
import { UserContextConsumer } from './logic/user.js';
import Protected from './layouts/protected'
import Public from './layouts/public';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import WellcomePage from './pages/wellcome'

export default function Routing() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/protected">
            <Protected />
          </PrivateRoute>
          <Route path="/:id">
            <Public />
          </Route>
          <Route path="/">
            <WellcomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <UserContextConsumer>
      {(user) => ( 
      <Route
        {...rest}
        render={({ location }) =>
           user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
      )}
    </UserContextConsumer>
  );
}

