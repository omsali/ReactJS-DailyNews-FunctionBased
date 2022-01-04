
import './App.css';

import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import Navbar from './compnents/Navbar';
import NewsComponent from './compnents/NewsComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App () {

  let pageSize = 9;
  let apiKey = process.env.REACT_APP_NEWS_API
  // apiKey = "cbb13c851680451382ecaafefbba9a54"
  
  const [progress, setProgress] = useState(0)
  
    return (
      <div>
          <Router>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            progress={progress}
            
          />
          <div>
          {/* Api key is -{process.env.REACT_APP_NEWS_API} */}

          </div>
          <Switch>
            <Route exact path="/business"><NewsComponent setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country='in' category="business"/></Route>
            <Route exact path="/entertainment"><NewsComponent setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country='in' category="entertainment"/></Route>
            <Route exact path="/"><NewsComponent setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country='in' category="general"/></Route>
            <Route exact path="/health"><NewsComponent setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country='in' category="health "/></Route>
            <Route exact path="/science"><NewsComponent setProgress={setProgress} apiKey={apiKey}  key="science" pageSize={pageSize} country='in' category="science"/></Route>
            <Route exact path="/sports"><NewsComponent setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country='in' category="sports"/></Route>
            <Route exact path="/technology"><NewsComponent setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country='in' category="technology"/></Route>
          </Switch>
        </Router>
        
      </div>
    )  
};

export default App;