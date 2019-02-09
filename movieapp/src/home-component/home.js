import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props){
    super(props)
      this.films = {
          rows: [
              <p key="0">Teste filme</p>,
              <p key="1">Teste filme1</p>,
              <p key="2">Teste filme2</p>,
          ]
      }
  }
  render() {
    return (
      <div className="home">
        { this.props.children }

        <input className={"searchInput"} placeholder={"Digite"}/>

          {this.films.rows}

      </div>
    )
  }
}
