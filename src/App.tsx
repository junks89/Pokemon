import React from "react";
import logo from "./Assets/Pokemon_logo.png";
import MainComponent from "./Components/MainComponent/MainComponent"; 
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        gotta catch'em all
      </header>
      <main>
      <ErrorBoundary>
        <MainComponent />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
