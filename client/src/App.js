import {BrowserRouter, Route, Routes} from "react-router-dom"
import React from "react";
import Home from "./Home"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
  );
}

export default App;
