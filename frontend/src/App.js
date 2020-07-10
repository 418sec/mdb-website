import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/UI/Navbar/NavBar";
import Footer from "./components/UI/Footer/Footer";
import SignUp from "./containers/Auth/SignUp/SignUp";
import SignIn from "./containers/Auth/SignIn/SignIn";

const App = () => {
  return (
    <React.Fragment>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
        </Switch>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default App;
