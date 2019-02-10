import React, { Component } from 'react';
import MovieItem from '../movie-item/MovieItem.js';
var api = require('../api/movieApi');

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {movieItems: <p>teste</p>};
  }

  componentDidMount(){
      api.getPopularMovies().then(function (response) {
          const results = response;
          var movies = [];
          results.forEach(movie => {
              const movieItem = <MovieItem movie={movie}/>
              movies.push(movieItem);
          })
          console.log(results);
      })
  }

  searchMovies(searchTerm){
      api.getMovies(searchTerm).then(function (response) {
          const results = response;
          var movies = [];
          results.forEach(movie => {
           const movieItem = <MovieItem movie={movie}/>
           movies.push(movieItem);
          })
          console.log(results);
      })
  }

  searchHandler(event){
      console.log(event.target.value);
      this.searchMovies(event.target.value);
  }


  render() {
    return (
      <div className="home">
        { this.props.children }

        <input type="text" onChange={this.searchHandler.bind(this)} className={"searchInput"} placeholder={"Digite"}/>

          {this.state.movieItems}

      </div>
    )
  }
}
