import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Layout from "./components/layout/layout"
import Navbar from "./components/layout/navbar/Navbar";
import Landing from "./components/layout/landing-page/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import "./App.css";

import Hiring from "./components/layout/hiring-page/Hiring.js";
import JobPosting from "./components/layout/hiring-page/cards/JobPosting";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

function withLayout(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {  
    render() {
      return <Layout>
        <WrappedComponent></WrappedComponent>
      </Layout>
    }
  };
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
            <Route exact path="/" component={withLayout(Landing)} />
            <Route exact path="/register" component={withLayout(Register)} />
            <Route exact path="/login" component={withLayout(Login)} />
            <Route exact path="/hiring" component={withLayout(Hiring)}/>
            <Route exact path="/addjob" component={withLayout(JobPosting)}/>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>

      </Router>
    </Provider>
  );
};
export default App;
