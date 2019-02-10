import React, { Component } from 'react';
import Header from '../common/header';

export default class MovieDetails extends Component {
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
