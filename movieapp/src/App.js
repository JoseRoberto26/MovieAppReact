import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './common/header.js';
import Home from './home-component/home.js';

class App extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="App">

        <Header/>

        <Home>

        </Home>


      </div>


    );
  }
}

export default App;
