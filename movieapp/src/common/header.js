import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div className="header" style={{
          backgroundColor: '#116193',
          display: 'block',
          paddingTop: '7px',
          paddingBottom: '7px'

      }}>
        <h1 style={{
            color: '#00e8e4',
            fontFamily: 'lato',
            fontFamily: 'abel',
        }
        }>
          Movies
        </h1>
      </div>
    )
  }
}
