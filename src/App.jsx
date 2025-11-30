import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Cookies from "js-cookie";

import Header from "./components/Header";
import Home from "./pages/Home";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Comic from "./pages/Comic";
import Favorites from "./pages/Favorites";

const App = () => {
  const [search, setSearch] = useState("");
  console.log(search);

  return (
    <Router>
      <Header search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/comics" element={<Comics search={search} />} />
        <Route path="/comic/:id" element={<Comic />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
