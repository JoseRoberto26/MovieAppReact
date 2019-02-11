import React, { Component } from 'react';
import Moment from 'react-moment';
import { Redirect } from 'react-router-dom'

const imgBaseUrl = "http://image.tmdb.org/t/p/w185";


export default class MovieItem extends Component {

    state ={
        redirect: false
    }

    setRedirect = () =>{
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () =>{
        if(this.state.redirect){
            let url = "/movie/"+this.props.movie.id;
            return <Redirect to={url}/>
        }
    }

    formatScore(number, count){
        if(count === 0){
            return "--";
        }
        return number *10 + "%";
    }


    imagePath(string){
        if(string) {
            return imgBaseUrl + string;
        }
    else{
            return "../assets/not-found.png"
        }
    }

    overviewTreatment(overview){
        if(overview === ""){
            return "Sinopse não informada";
        }
        else{
            return overview;
        }
    }

    render() {
    return  (
      <div className="movieitem" onClick={this.setRedirect}>
          {this.renderRedirect()}

          <main className="main-cointaner">
              <div className="img-box">
                  <img className="movie-poster" src={this.imagePath(this.props.movie.poster_path)}/>
              </div>

              <div className="movie-box">
                <div>
                    <div className="title-header">
                        <div className="score-circle-box">
                            <div className="circle-score">{this.formatScore(this.props.movie.vote_average, this.props.movie.vote_count)}</div>
                        </div>
                        <div className="title-box">
                            <p className="self-end">{this.props.movie.title}</p>
                        </div>
                    </div>
                    <div className="date-box">
                        <div className="date-space"></div>
                        <Moment format="DD/MM/YYYY">
                            {this.props.movie.release_date}
                        </Moment>
                    </div>
                </div>
                  <div className="movie-info-box">
                      <div className="content">
                          {this.overviewTreatment(this.props.movie.overview)}
                      </div>
                      <div className="genres-field">
                          <span className="genre-box">{this.props.genres}</span>
                      </div>
                  </div>
              </div>
          </main>
    </div>

    )
  }

}
