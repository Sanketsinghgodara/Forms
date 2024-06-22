import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Level1 from "./components/Level1";
import Level2 from "./components/Level2";
import Level3 from "./components/Level3";
import About from "./components/About";

function App() {
  return (
    <Router>
       
      <div className="bg-gray-700 text-3xl text-center min-h-screen flex flex-col items-center justify-center">
         
        <h2 className="mb-4 text-white">Select a Form Level:</h2>
        <nav className="mb-4">
          <ul className="flex gap-4">
            <li>
              <Link
                to="/level1"
                className="p-2 rounded-md bg-gray-800 text-white text-2xl hover:bg-gray-600"
              >
                Level 1
              </Link>
            </li>
            <li>
              <Link
                to="/level2"
                className="p-2 rounded-md bg-gray-800 text-2xl text-white hover:bg-gray-600"
              >
                Level 2
              </Link>
            </li>
            <li>
              <Link
                to="/level3"
                className="p-2 rounded-md bg-gray-800 text-2xl text-white hover:bg-gray-600"
              >
                Level 3
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                className="p-2 rounded-md bg-gray-800 text-2xl text-white hover:bg-gray-600"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/level1" element={<Level1 />} />
          <Route path="/level2" element={<Level2 />} />
          <Route path="/level3" element={<Level3 />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
