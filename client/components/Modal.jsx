import React from 'react';

const Modal = (props) => {
  console.log('== MODAL BOOK DATA ==>', props.book)
  return (
    <div id='also-enjoyed-modal' style={{left:`${props.modalLeft}px`}}>
      <div className='also-enjoyed-modal-title-container'>
        <h2 className='also-enjoyed-modal-title'>{props.book.title}</h2>
        {props.book.subtitle &&
          <h3 className='also-enjoyed-modal-subtitle'>{props.book.subtitle}</h3>
        }
      </div>
      <div className='also-enjoyed-modal-meta-container'>
        <h5 className='also-enjoyed-modal-meta'>By: {props.book.author}</h5>
        <h5 className='also-enjoyed-modal-meta'>Narrated by: {props.book.narrator}</h5>
        <h5 className='also-enjoyed-modal-meta'>Length: {props.book.length.split(':')[0]} hrs and {props.book.length.split(':')[1]} mins</h5>
        <h5 className='also-enjoyed-modal-meta'>{props.book.version.split(' ')[0]}</h5>
      </div>
      <div className='also-enjoyed-modal-stars-container'>
        <div className='also-enjoyed-modal-stars'>
          Overall: STARS COMPONENT count
        </div>
        <div className='also-enjoyed-modal-stars'>
          Performance: STARS COMPONENT count
        </div>
        <div className='also-enjoyed-modal-stars'>
          Story: STARS COMPONENT count
        </div>
      </div>
      <p className='also-enjoyed-modal-summary'>This is the summary</p>
      <hr />
      <div className='also-enjoyed-modal-review'>
        <span className='also-enjoyed-modal-stars'></span>
        <h4 className='also-enjoyed-modal-review-title'>"Review Title"</h4>
        <p className='also-enjoyed-modal-review-author'>By <em>Name</em> on mm-dd-yy</p>
      </div>
    </div>
  );
}

export default Modal;