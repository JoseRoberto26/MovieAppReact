import React, { Component } from 'react';
import MovieItem from '../movie-item/MovieItem.js';
import $ from 'jquery'
var api = require('../api/movieApi');
var axios = require('axios');
const apiKey = '5a240d5ac38592ee034f80a46ddeadbd';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {items: []};
  }

  componentDidMount(){
      var encodedURI = window.encodeURI('https://api.themoviedb.org/3/movie/popular?api_key='+apiKey+'&language=pt-BR');

      return axios.get(encodedURI).then(response =>{
          this.setState({items : response.data.results});
      })
  }

  searchMovies(searchTerm){
      var encodedURI = window.encodeURI('https://api.themoviedb.org/3/search/movie?api_key='+apiKey+'&language=pt-BR&query='+searchTerm);

      axios.get(encodedURI).then(response => {
          this.setState({items : response.data.results});
      });
  }

  searchHandler(event){
      this.searchMovies(event.target.value);
  }


  render() {

      let renderItems;
      const items = this.state.items;
      renderItems = items.map((item) => {
          return <MovieItem key ={item.id} movie ={item}/>;
      })


    return (
      <div className="home">
        { this.props.children }

        <input type="text" onChange={this.searchHandler.bind(this)} className={"searchInput"} placeholder={"Digite"}/>
          {renderItems}


      </div>
    )
  }
}
