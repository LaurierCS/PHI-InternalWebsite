import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Header from './components/Layout/Header';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </BrowserRouter>
    </>
  );
}
