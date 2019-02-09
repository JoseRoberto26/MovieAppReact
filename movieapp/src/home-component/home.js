import React, { Component } from 'react';

export default class home extends Component {
  render() {
    return (
      <div className="home">
        { this.props.children }
      </div>
    )
  }
}
