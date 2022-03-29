import React from 'react';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Header from './Header/Header';
import Main from './Main/Main';
import Live from './Live/Live';
import Motivator from './Motivator/Motivator';
import Category from './Category/Category';
import Single from './Single/Single';
import Play from './Play/Play';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="Content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/LiveToday" element={<Live />} />
              <Route path="/motivator/*" element={<Motivator />} />
              <Route path="/category/*" element={<Category />} />
              <Route path="/single" element={<Single />} />
              <Route path="/play" element={<Play />} />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
