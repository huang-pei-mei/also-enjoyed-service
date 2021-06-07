import React from 'react';
import circle from '../assets/circle.png';

class ToggleDots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: this.props.firstIndex
    };
  }

  render() {
    return (
      <div id='toggledots-area'>
        {[0,1,2].map(page => {
          return (
            <span key={page}>
              <img
                src={circle}
                alt={`page${page}`}
                className='toggledot'
                id={`page${page}`}
              ></img>
            </span>
          )
        })}
      </div>
    )
  }
}

export default ToggleDots;