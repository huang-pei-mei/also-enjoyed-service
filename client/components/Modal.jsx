import React from 'react';

const Modal = (props) => {

  return (
    <div id='also-enjoyed-modal'>
      <div className='also-enjoyed-modal-title-container'>
        <h2 className='also-enjoyed-modal-title'>Book Title</h2>
        {props.book.subtitle &&
          <h3 className='also-enjoyed-modal-subtitle'>Book Subtitle</h3>
        }
      </div>
      <div className='also-enjoyed-modal-meta-container'>
        <h5 className='also-enjoyed-modal-meta'>By: Author</h5>
        <h5 className='also-enjoyed-modal-meta'>Narrated by: Narrator</h5>
        <h5 className='also-enjoyed-modal-meta'>Length: X hrs and Y mins</h5>
        <h5 className='also-enjoyed-modal-meta'>Abridged</h5>
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