import React, { Component } from 'react';
import MovieItem from '../movie-item/MovieItem.js';
import ReactPaginate from "react-paginate";

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
          this.setState({genres: response.data.genres});
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
  handlePageChange(event){
      event.selected = event.selected + 1;
      this.setState({currentPage: event.selected})
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
              genres.forEach(genre => {
                  if(genre.id === itemGenre){
                      itemGenreNames.push(genre.name);
                  }
              })
          })
          return <MovieItem key ={item.id} movie ={item} genres={itemGenreNames}/>;
      });

    return (
      <div className="home">
        { this.props.children }

        <input type="text" onChange={this.searchHandler.bind(this)} className={"searchInput"} placeholder={"Busque um filme por nome, ano ou gênero..."}/>
          {renderItems}

          <div className="pagination">
              <ReactPaginate
                  pageCount={items.length / pageLimit}
                  marginPagesDisplayed={2}
                  onPageChange={this.handlePageChange.bind(this)}
                  pageRangeDisplayed={5}
                  previousLabel={'<'}
                  nextLabel={'>'}/>
          </div>

      </div>
    )
  }
}
