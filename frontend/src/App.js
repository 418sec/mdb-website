import React, { Suspense } from "react";
import "./App.css";

import Navbar from "./components/UI/Navbar/NavBar";
import Footer from "./components/UI/Footer/Footer";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Navbar />
      </div>
      <Footer />
    </Suspense>
  );
};

export default App;
