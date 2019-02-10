import React, { Component } from 'react';

export default class error extends Component {
  render() {
    return (
      <div className="error">
        { this.props.children }

        <p>Not Found</p>

      </div>
    )
  }
}
