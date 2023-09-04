import React, { useState } from 'react';
import './App.css';
import Data from './Data';
import video from './photos/video2.mp4';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Parent } from './Parent';
import { TournamentLeaderboard } from './TournamentLeaderboard';
import { Test } from './test';
import { TournamentParent } from './TournamentParent';

function App() {
 

  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Parent />}/> 
       
          <Route path="/tournament" element={< TournamentParent />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
