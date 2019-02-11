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

    render() {
    return  (
      <div className="movieitem" onClick={this.setRedirect}>
          {this.renderRedirect()}
          <h1>{this.props.movie.title}</h1>
          <p> {this.props.genres} </p>
          <Moment format="DD/MM/YYYY">
              {this.props.movie.release_date}
          </Moment>
          <p>{this.formatScore(this.props.movie.vote_average, this.props.movie.vote_count)}</p>
          <p>{this.props.movie.overview}</p>
          <img src={this.imagePath(this.props.movie.poster_path)}/>

      </div>
    )
  }

}
