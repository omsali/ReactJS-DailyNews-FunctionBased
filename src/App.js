
import './App.css';

import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'
import Navbar from './compnents/Navbar';
import NewsComponent from './compnents/NewsComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
export default class App extends Component {
  pageSize = 9;
  apiKey = process.env.REACT_APP_NEWS_API
  // apiKey = "cbb13c851680451382ecaafefbba9a54"

  state  = {
    progress:0
  }

  setProgress = (progress)=>{
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <div>
          <Router>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            
          />
          <div>
          {/* Api key is -{process.env.REACT_APP_NEWS_API} */}

          </div>
          <Switch>
            <Route exact path="/business"><NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country='in' category="business"/></Route>
            <Route exact path="/entertainment"><NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country='in' category="entertainment"/></Route>
            <Route exact path="/"><NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country='in' category="general"/></Route>
            <Route exact path="/health"><NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country='in' category="health "/></Route>
            <Route exact path="/science"><NewsComponent setProgress={this.setProgress} apiKey={this.apiKey}  key="science" pageSize={this.pageSize} country='in' category="science"/></Route>
            <Route exact path="/sports"><NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country='in' category="sports"/></Route>
            <Route exact path="/technology"><NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country='in' category="technology"/></Route>
          </Switch>
        </Router>
        
      </div>
    )
  }
}

