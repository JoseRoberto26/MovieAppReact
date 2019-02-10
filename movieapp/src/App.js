import React, { Component } from 'react';
import './App.css';
import Header from './common/header.js';
import Home from './home-component/home.js';
import Error from './common/error';
import MovieDetails from './movie-details/MovieDetails';
import {Switch, Route, BrowserRouter} from "react-router-dom";

class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="App">
          <Header/>

<BrowserRouter>

        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/movie/:movieId" component={MovieDetails}/>
            <Route component={Error}/>
        </Switch>
</BrowserRouter>

      </div>


    );
  }
}

export default App;
