import React, { Component } from 'react';
import YoutubeEmbedVideo from "youtube-embed-video";

var axios = require('axios');
const apiKey = '5a240d5ac38592ee034f80a46ddeadbd';
const imgBaseUrl = "http://image.tmdb.org/t/p/w185";
const genreNames = [];
export default class MovieDetails extends Component {
constructor(props){
    super(props);
    this.state = {details: [], videoID: ""};

}
    componentWillMount(){
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/movie/'+this.props.match.params.movieId+'?api_key='+apiKey+'&language=pt-BR');
        var videoURI = window.encodeURI('https://api.themoviedb.org/3/movie/'+this.props.match.params.movieId+'/videos?api_key='+apiKey+'&language=pt-BR');
         axios.get(encodedURI).then(response =>{
            this.setState({details : response.data});
            console.log(this.state);
            this.state.details.genres.forEach(genre =>{
                genreNames.push(genre.name);
                console.log(genreNames);
            })
        })

        axios.get(videoURI).then(response => {
            console.log(response);
            response.data.results.forEach(trailer => {
                if(trailer){
                    this.state.videoID = trailer.key;
                }
            })
        })
    }



  render() {
    return (
      <div className="moviedetails">
        { this.props.children }

        <div>

          <div className="title">
              {this.state.details.title}
          </div>

          <div className="boxBody">

          <div className="leftBox">

          <section className="overview">
              {this.state.details.overview}
          </section>

          <section className="info">
            Informações
          </section>

          <section className="genre-score">
              {this.genresNames}
          </section>

          </div>

          <img src={imgBaseUrl+this.state.details.poster_path}/>

          </div>

        </div>

          <YoutubeEmbedVideo videoId={this.state.videoID}/>

      </div>
    )
  }
}
