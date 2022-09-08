import Home from "./component/Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Disconnect from "./component/Disconnect";
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYW1pbmViayIsImEiOiJjbDdyeWdkbXIwazJ5M3ZudzYzNHFlNHZlIn0.k9qyqTo6o2UoM6ZCOOqMXw';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/disconnect" element={<Disconnect />} />
      </Routes>
    </Router>
  );
}

export default App;
