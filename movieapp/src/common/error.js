import React, { Component } from 'react';

export default class error extends Component {
  render() {
    return (
      <div className="error">
        { this.props.children }

        <img alt="" src="../assets/error-404.png"/>

      </div>
    )
  }
}
