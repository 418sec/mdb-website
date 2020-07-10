import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/UI/Navbar/NavBar";
import Footer from "./components/UI/Footer/Footer";
import SignUp from "./containers/Auth/SignUp/SignUp";
import SignIn from "./containers/Auth/SignIn/SignIn";
import HomePage from "./containers/HomePage/HomePage";
import DetailPage from "./containers/MovieDetail/MovieDetail";

const App = () => {
  return (
    <React.Fragment>
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/register" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          <Route exact path="/movie/:movieId" component={DetailPage} />
        </Switch>
      </div>
     <Footer />
    </React.Fragment>
  );
};

export default App;
