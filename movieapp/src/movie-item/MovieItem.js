import React, { Component } from 'react';

export default class MovieItem extends Component {
constructor(props) {
    super(props);
}

  render() {
    return (
      <div className="movieitem">
        { this.props.children }

        <table key={this.props.movie.id}>
          <tbody>
          <tr>
            <td>
              <img alt="poster" width="50" src={this.props.movie.posterPath}/>
            </td>
            <td width="8">
                <div  className="itemHeader">
                  <h2>{this.props.movie.title}</h2>
                </div>
            </td>
          </tr>
          <td>
                <div className="overview">
                    <p>{this.props.movie.overview}</p>
                    <div className="genres">
                      Genres
                    </div>
                </div>
            </td>
          </tbody>
        </table>
      </div>
    )
  }
}
