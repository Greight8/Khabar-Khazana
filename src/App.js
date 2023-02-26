import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

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
  const [switchTxt, setSwitchTxt] = useState("Dark Mode")

  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17 24 39";
      setSwitchTxt("Light Mode");
    }
    else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      setSwitchTxt("Dark Mode");
    }
  }

  return (
    <>
      <Router>
        <div>
          <Navbar title="Khabar Khazana" mode={mode} toggleMode={toggleMode} switchTxt={switchTxt} />

          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />

          <Routes>

            <Route exact path="/"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" />}
            />


            <Route exact path="/general"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" />}
            />


            <Route exact path="/sports"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports" />}
            />


            <Route exact path="/business"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business" />}
            />


            <Route exact path="/entertainment"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />}
            />


            <Route exact path="/health"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health" />}
            />


            <Route exact path="/science"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science" />}
            />


            <Route exact path="/technology"
              element={<News mode={mode} apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology" />}
            />

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;