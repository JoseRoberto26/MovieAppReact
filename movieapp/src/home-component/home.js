import React, { Component } from 'react';
import MovieItem from '../movie-item/MovieItem.js';
var axios = require('axios');
const apiKey = '5a240d5ac38592ee034f80a46ddeadbd';
const pageLimit = 5;

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {items: [], genres: [], currentPage: 1};
  }

  componentWillMount(){
      var genreURI = window.encodeURI('https://api.themoviedb.org/3/genre/movie/list?api_key='+apiKey+'&language=pt-BR')

      axios.get(genreURI).then(response => {
          this.state.genres = response.data.genres;
      })

  }

  componentDidMount(){
      var encodedURI = window.encodeURI('https://api.themoviedb.org/3/movie/popular?api_key='+apiKey+'&language=pt-BR');

      axios.get(encodedURI).then(response =>{
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
      const genres = this.state.genres;

      const lastIndex = this.state.currentPage * pageLimit;
      const firstIndex = lastIndex - pageLimit;

      const currentItems = items.slice(firstIndex, lastIndex);

      renderItems = currentItems.map((item) => {
          let itemGenreNames = [];
          item.genre_ids.forEach(itemGenre => {
              console.log(item);
              genres.forEach(genre => {
                  if(genre.id == itemGenre){
                      itemGenreNames.push(genre.name);
                  }
              })
          })
          return <MovieItem key ={item.id} movie ={item} genres={itemGenreNames}/>;
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
