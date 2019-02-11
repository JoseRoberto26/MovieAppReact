import React, { Component } from 'react';
import Moment from 'react-moment';
import YoutubeEmbedVideo from "youtube-embed-video";

var axios = require('axios');
const apiKey = '5a240d5ac38592ee034f80a46ddeadbd';
const imgBaseUrl = "http://image.tmdb.org/t/p/w185";
const genreNames = [];
export default class MovieDetails extends Component {
constructor(props){
    super(props);
    this.state = {details: [], videoID: "", genreNamesState: []};

}
    componentWillMount(){
        var encodedURI = window.encodeURI('https://api.themoviedb.org/3/movie/'+this.props.match.params.movieId+'?api_key='+apiKey+'&language=pt-BR');
        var videoURI = window.encodeURI('https://api.themoviedb.org/3/movie/'+this.props.match.params.movieId+'/videos?api_key='+apiKey+'&language=pt-BR');
         axios.get(encodedURI).then(response =>{
            this.setState({details : response.data});
            this.state.details.genres.forEach(genre =>{
                genreNames.push(genre.name);
            })
             this.setState({genreNamesState: genreNames});
        })

        axios.get(videoURI).then(response => {
            console.log(response);
            response.data.results.forEach(trailer => {
                if(trailer){
                    this.setState({videoID: trailer.key})
                }
            })
        })
    }

    formatStatus(string){
    if(string === "Released"){
        return "Lançado";
    }
    else if(string === "Post Production"){
        return "Em Pós-Produção";
    }
    else if(string === "Planned"){
        return "Planejado";
    }
    }

    formatLanguage(string){
    if(string === "en"){
        return "Inglês";
    }
    else if(string === "es"){
        return "Espanhol";
    }
    else if(string === "pt"){
        return "Português";
    }
    else if(string === "fr"){
        return "Francês";
    }
    else if(string === "de"){
        return "Alemão";
    }
    else {
        return "Outros";
    }
    }

    formatDuration(time){
       let hours = Math.round(time / 60);
       let mins = time - (60 * hours);
        return hours+"h"+mins+"mins";
    }

    formatToDolar(value){
    if(value === 0){
        return "--";
    }
    if(value){
            return 'U$'+ value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ',00';
        }
    }

    calculateProfit(revenue, budget){
    if(revenue == 0){
        return "--";
    }
    else{
        return this.formatToDolar(revenue - budget);
    }
    }
    formatScore(number, count){
        if(count === 0){
            return "--";
        }
        return number *10 + "%";
    }



  render() {
    return (
      <div className="moviedetails">
        { this.props.children }

        <div>

          <div className="title">
              {this.state.details.title}
              <Moment format="DD/MM/YYYY">
                  {this.state.details.release_date}
                  </Moment>
          </div>

          <div className="boxBody">

          <div className="leftBox">

          <section className="overview">
              <p>Sinopse</p>
              {this.state.details.overview}
          </section>

          <section className="info">
            <p>Informações</p>
              Situação
              <p> {this.formatStatus(this.state.details.status)}</p>
              Idioma
              <p>{this.formatLanguage(this.state.details.original_language)}</p>
              Duração
              <p>{this.formatDuration(this.state.details.runtime)}</p>
              Orçamento
              <p>{this.formatToDolar(this.state.details.budget)}</p>
              Receita
              <p>{this.formatToDolar(this.state.details.revenue)}</p>
              Lucro
              <p>{this.calculateProfit(this.state.details.revenue, this.state.details.budget)}</p>

          </section>

          <section className="genre-score">
              <p>{this.state.genreNamesState}</p>
              Score -String não fica-
              <p>{this.formatScore(this.state.details.vote_average, this.state.details.vote_count)}</p>
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
