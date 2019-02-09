import React, { Component } from 'react';

export default class MovieItem extends Component {
  render() {
    return (
      <div className="movieitem">
        { this.props.children }




      </div>
    )
  }
}
