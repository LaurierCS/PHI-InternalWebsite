import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import Home from './components/Pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Header from './components/Layout/Header';
import UserContext from './context/UserContext';

export default function App() {
  //Context provider creates a state to share with other components
  //All of the other components will have access to the userData and setUserData objects

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    //Because you can't set useEffect to be asynchronous we have to define an asynchronous function within it
    const checkLoggedIn = async () => {
       //Right now we are just using local storage to retrieve the tokens
       //Grab current token
       let token = localStorage.getItem("auth-token");

       //Check for invalid token
       if (token === null) {
         localStorage.setItem("auth-token", "");
         token = "";
       }

       const tokenRes = await Axios.post(
         "http://localhost:5000/users/tokenIsValid",
         null,
         {
           headers: { "x-auth-token": token }
         }
       );

       if (tokenRes.data) {
         const userRes = await Axios.get("http://localhost:5000/users/",
          {
            headers: {"x-auth-token": token},
          }
         );
         setUserData({
           token,
           user: userRes.data,
         })
       }
       console.log(tokenRes.data);
    };

    checkLoggedIn();
  }, []);
  //Second parameter is for states and runs it when that state is changed,
  //keeping the array empty means that it'll run only once when the app starts

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
