import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = ()=> {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const [progress, setProgress] = useState(0);
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color="#f11946"
            height={3}
            progress={progress}
          />
          <Routes>
            <Route exact path="news-hub-react/" element={<News setProgress={setProgress} apiKey={apiKey}   />} />
            <Route
              exact
              path="news-hub-react/business"
              element={<News setProgress={setProgress} apiKey={apiKey}   key="busines" category="business" />}
            />
            <Route
              exact
              path="news-hub-react/entertainment"
              element={<News setProgress={setProgress} apiKey={apiKey}   key="entertainment" category="entertainment" />}
            />
            <Route
              exact
              path="news-hub-react/general"
              element={<News setProgress={setProgress} apiKey={apiKey}   key="general" category="general" />}
            />
            <Route
              exact
              path="news-hub-react/health"
              element={<News setProgress={setProgress} apiKey={apiKey}   key="health" category="health" />}
            />
            <Route
              exact
              path="news-hub-react/science"
              element={<News setProgress={setProgress} apiKey={apiKey}   key="science" category="science" />}
            />
            <Route
              exact
              path="news-hub-react/sports"
              element={<News setProgress={setProgress} apiKey={apiKey}   key="sports" category="sports" />}
            />
            <Route
              exact
              path="news-hub-react/technology"
              element={<News setProgress={setProgress} apiKey={apiKey}   key="technology" category="technology" />}
            />
          </Routes>
        </Router>
      </div>
    );
}
export default App;