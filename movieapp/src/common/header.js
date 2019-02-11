import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
export default class Header extends Component {

  render() {
    return (
      <div className="header" style={{
          backgroundColor: '#116193',
          display: 'block',
          paddingTop: '7px',
          paddingBottom: '7px'

      }} >
        <NavLink activeStyle={{
            color: '#00e8e4',
            fontFamily: 'lato',
            fontFamily: 'abel',
            fontSize: '40px',
            textDecoration: 'none'
        }
        } to="/">
          Movies
        </NavLink>
      </div>
    )
  }
}
