import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'


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

    render() {
    return  (
      <div className="movieitem" onClick={this.setRedirect}>
          {this.renderRedirect()}
          <h1>{this.props.movie.title}</h1>

      </div>
    )
  }

}
