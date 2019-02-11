import React, { Component } from 'react';
import Moment from 'react-moment';
import YoutubeEmbedVideo from "youtube-embed-video";

var axios = require('axios');
const apiKey = '5a240d5ac38592ee034f80a46ddeadbd';
const imgBaseUrl = "http://image.tmdb.org/t/p/w185";

export default class MovieDetails extends Component {
constructor(props){
    super(props);
    this.state = {details: [], videoID: "", genreNamesState: []};

}
    componentWillMount(){
        this.setState({genreNamesState: []});
        this.setState({details: []});
        let genreNames = [];
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
            response.data.results.forEach(trailer => {
                console.log(trailer);
                if(trailer.key){
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
    if(revenue === 0){
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

        <main className="main-container-details">
            <section className="title-details">
                <h1 className="title-details-text">{this.state.details.title}</h1>
                <div className="date-text">
                    <Moment format="DD/MM/YYYY">
                        {this.state.details.release_date}
                    </Moment>
                </div>
            </section>

            <section className="content-box-details">
                <div className="main-info-box">
                    <h2 className="overview-text">Sinopse</h2>
                    <article className="details-overview">{this.state.details.overview}</article>
                    <h2 className="overview-text">Informações</h2>
                    <div className="info-content-box">
                        <div className="info-content-item">
                            <h3 className="content-item-name">Situação</h3>
                            <p className="content-item-value"> {this.formatStatus(this.state.details.status)}</p>
                        </div>
                        <div className="info-content-item">
                            <h3 className="content-item-name">Idioma</h3>
                            <p className="content-item-value"> {this.formatLanguage(this.state.details.original_language)}</p>
                        </div>
                        <div className="info-content-item">
                            <h3 className="content-item-name">Duração</h3>
                            <p className="content-item-value"> {this.formatDuration(this.state.details.runtime)}</p>
                        </div>
                        <div className="info-content-item">
                            <h3 className="content-item-name">Orçamento</h3>
                            <p className="content-item-value"> {this.formatToDolar(this.state.details.budget)}</p>
                        </div>
                        <div className="info-content-item">
                            <h3 className="content-item-name">Receita</h3>
                            <p className="content-item-value"> {this.formatToDolar(this.state.details.revenue)}</p>
                        </div>
                        <div className="info-content-item">
                            <h3 className="content-item-name">Lucro</h3>
                            <p className="content-item-value"> {this.calculateProfit(this.state.details.revenue, this.state.details.budget)}</p>
                        </div>
                    </div>
                    <div className="genre-score-box-details">
                        <div className="genres-field">
                            {this.state.genreNamesState.map( genre => <span key={genre} className="genre-box">{genre}</span>)}
                        </div>
                        <div className="score-circle-details-box">
                            <div className="score-circle-details">
                                {this.formatScore(this.state.details.vote_average, this.state.details.vote_count)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="details-poster">
                    <img alt="" style={{    width: '100%',
                        height: '100%'}} src={imgBaseUrl+this.state.details.poster_path}/>
                </div>
            </section>

            <section className="video-box">

                {this.state.videoID && <YoutubeEmbedVideo width={1700} height={820} videoId={this.state.videoID}/>}
            </section>

        </main>


      </div>
    )
  }
}
