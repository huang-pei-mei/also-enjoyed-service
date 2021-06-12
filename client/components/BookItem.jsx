import React from 'react';
import Modal from './Modal.jsx';

class BookItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    };
    // this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.changeBookId(this.props.book.id);
  }

  // handleHover(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   console.log('hovering!!!', e.target);
  //   console.log(`changing hover state from ${this.state.isHovering} to ${!this.state.isHovering}`)
  //   this.setState({
  //     isHovering: !this.state.isHovering
  //   });
  // }

  render() {
    const modalLeft = (150 + 20) * (this.props.book.i % 6);
    const modalVisible = this.state.isHovering;

    return (
        <div className='also-enjoyed-bookItem' id={this.props.book.i} onMouseEnter={this.props.handleHover} onMouseLeave={this.props.handleHover}>
          <img
            className='also-enjoyed-bookCover'
            src={this.props.book.imageUrl}
            alt={this.props.book.title + ' cover'}
            onClick={this.handleClick}
          ></img>
          <h3
            className='also-enjoyed-bookTitle also-enjoyed-under-text'
            onClick={this.handleClick}
          >{this.props.book.title}</h3>
          <span className='also-enjoyed-bookAuthor-area also-enjoyed-under-text'>
            By: <span className='also-enjoyed-bookAuthor'>{this.props.book.author}</span>
          </span>
          {/* {
            this.state.isHovering &&
            <Modal
              book={{subtitle: ''}}
              style={{left: modalLeft + 'px'}}
            ></Modal>
          } */}
        </div>
    );
  }
}

export default BookItem;