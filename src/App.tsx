import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import HeaderSmallScreen from "./Components/Header/HeaderSmallScreen/HeaderSmallScreen";
import Routes from "./Routes/Routes";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <HeaderSmallScreen />
        <Header />
        <Routes />
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
