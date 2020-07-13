import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/UI/Navbar/NavBar";
import SignUp from "./containers/Auth/SignUp/SignUp";
import SignIn from "./containers/Auth/SignIn/SignIn";
import HomePage from "./containers/HomePage/HomePage";
import DetailPage from "./containers/MovieDetail/MovieDetail";
import Auth from "./hoc/auth";

const App = () => {
  return (
    <React.Fragment>
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Auth(HomePage, null)} />
          <Route exact path="/register" component={Auth(SignUp, false)} />
          <Route exact path="/login" component={Auth(SignIn, false)}  />
          <Route exact path="/movie/:movieId" component={Auth(DetailPage, null)} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default App;
