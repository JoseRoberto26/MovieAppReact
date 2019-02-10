import React, { Component } from 'react';


export default class MovieItem extends Component {



    render() {



    return  (
      <div className="movieitem" onClick={this.redirection}>

          <h1>{this.props.movie.title}</h1>

      </div>
    )
  }
    redirection = () =>{
        this.context.router.push('/movie/'+this.props.movie.id+'');
    }
}
