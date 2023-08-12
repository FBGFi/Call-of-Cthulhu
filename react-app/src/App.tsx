import React from "react";
import "./App.css";
import { GamePage } from "./views/GamePage/GamePage";
import { TopBar } from "./components/TopBar/TopBar";

export const App = () => {
  return (
    <div className="App">
      <TopBar />
      <GamePage />
    </div>
  );
};
