import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import darkimg from './dark.jpg';
import lightimg from './light.jpg';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'


function App() {
  const pageSize = 6;

  const apiKey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0)

  // seeting up dark-mode
  const [mode, setMode] = useState("light");

  const [img, setImg] = useState(darkimg)

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17 24 39)";
      setImg(lightimg);
    }
    else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      setImg(darkimg);
    }
  }

  return (
    <>
      <Router>
        <div>
          <Navbar title="Khabar Khazana" mode={mode} toggleMode={toggleMode} img={img} />

          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />

          <Routes>

            <Route exact path="/"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="us" category="general" />}
            />


            <Route exact path="/general"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="us" category="general" />}
            />


            <Route exact path="/sports"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="us" category="sports" />}
            />


            <Route exact path="/business"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="us" category="business" />}
            />


            <Route exact path="/entertainment"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />}
            />


            <Route exact path="/health"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="us" category="health" />}
            />


            <Route exact path="/science"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="us" category="science" />}
            />


            <Route exact path="/technology"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="us" category="technology" />}
            />

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;