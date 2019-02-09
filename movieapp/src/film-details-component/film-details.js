import React, { Component } from 'react';

export default class film-details extends Component {
  render() {
    return (
      <div className="film-details">
        { this.props.children }
      </div>
    )
  }
}
