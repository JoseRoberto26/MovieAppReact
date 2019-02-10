import React, { Component } from 'react';
import Header from '../common/header';
var axios = require('axios');
const apiKey = '5a240d5ac38592ee034f80a46ddeadbd';

export default class MovieDetails extends Component {

    componentDidMount(){
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/movie/'+this.props.match.params.movieId+'?api_key='+apiKey+'&language=pt-BR');

        return axios.get(encodedURI).then(response =>{
            this.setState({items : response.data.results});
        })
    }


  render() {
    return (
      <div className="moviedetails">
        { this.props.children }

        <Header/>

        <div>

          <div className="title">
            Title
          </div>

          <body className="boxBody">

          <div className="leftBox">

          <section className="overview">
            Overview
          </section>

          <section className="info">
            Info
          </section>

          <section className="genre-score">
              Genre and score
          </section>

          </div>

          <img/>

          </body>

        </div>

        <iframe className="trailerFrame">

        </iframe>


      </div>
    )
  }
}
