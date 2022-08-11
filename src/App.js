import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Switch } from "react-router-dom";
import Todo from "./components/Todo/Todo";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import React, { useState, useEffect } from "react";
import { auth } from "./config/firebase";
function App() {
  const [user, setUser] = useState("");

  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthState({ user, pending: false, isSignedIn: !!user });
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <>
      <Navbar user={authState.user}></Navbar>
      <Switch>
        <Route exact path="/">
          {console.log(authState)}
          {console.log("todo")}
          {authState.pending === false && <Todo user={authState.user} />}
        </Route>
        <Route path="/Login">
          <Login user={user}></Login>
        </Route>
        <Route path="/Signup">
          <Signup user={user}></Signup>
        </Route>
      </Switch>
    </>
  );
}

export default App;
