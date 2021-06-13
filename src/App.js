import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Logout from "./components/Logout";
import {Switch,Route} from 'react-router-dom';
import React,{ createContext, useReducer } from 'react';
import {initialState,reducer} from "./components/UseReducer";

export const UserContext = React.createContext();

function App() {

  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <>
        <UserContext.Provider value={{state,dispatch}}>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/contact">
            <Contact/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/signup">
            <Signup/>
          </Route>
          <Route exact path="/logout">
            <Logout/>
          </Route>
        </Switch>
        </UserContext.Provider>
    </>
  );
}

export default App;
