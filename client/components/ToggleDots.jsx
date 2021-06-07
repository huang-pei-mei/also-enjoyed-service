import React from 'react';
import circle from '../assets/circle.png';

class ToggleDots extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.onDotToggle(e);
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
                className={this.props.firstIndex / 6 === page ? 'toggledot toggledot-selected' : 'toggledot toggledot-not-selected'}
                id={`page${page}`}
                onClick={this.handleClick}
              ></img>
            </span>
          )
        })}
      </div>
    )
  }
}

export default ToggleDots;