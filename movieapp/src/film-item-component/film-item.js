import React, { Component } from 'react';

export default class film-item extends Component {
  render() {
    return (
      <div className="film-item">
        { this.props.children }
      </div>
    )
  }
}
