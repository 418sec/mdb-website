import React, { Suspense } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/UI/Navbar/NavBar";
import Footer from "./components/UI/Footer/Footer";
import SignUp from "./containers/Auth/SignUp/SignUp";

const App = () => {
  return (
    <Suspense>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/register" component={SignUp} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
};

export default App;
