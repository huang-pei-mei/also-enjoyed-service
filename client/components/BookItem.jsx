import React from 'react';

const BookItem = (props) => {
  const handleClick = (e) => {
    props.changeBookId(props.book.id);
  }

  return (
    <div className='also-enjoyed-bookItem'>
      <img
        className='also-enjoyed-bookCover'
        src={props.book.imageUrl}
        alt={props.book.title + ' cover'}
        onClick={handleClick}
      ></img>
      <h3
        className='also-enjoyed-bookTitle also-enjoyed-under-text'
        onClick={handleClick}
      >{props.book.title}</h3>
      <span className='also-enjoyed-bookAuthor-area also-enjoyed-under-text'>
        By: <span className='also-enjoyed-bookAuthor'>{props.book.author}</span>
      </span>
    </div>
  )
};

export default BookItem;