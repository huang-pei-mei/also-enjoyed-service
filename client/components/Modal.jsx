import React from 'react';
import requests from 'axios';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      review: null,
      aggReviews: null,
      summary: null
    };
  }

  componentDidMount() {
    const bookId = this.props.book.id;
    const reviewsService = 'http://54.183.2.218:4001/reviews/carouselReviews';
    const summaryService = `http://ec2-18-188-135-5.us-east-2.compute.amazonaws.com:1220/api/summaries/${bookId}`;
    const aggReviewService = `http://ec2-18-220-21-137.us-east-2.compute.amazonaws.com:2880/api/aggReview/${bookId}`;

    requests.get(reviewsService)
      .then((data) => {
        console.log('review data: ', data);
        // return this.setState({
        //   review: data
        // })
      });
    requests.get(summaryService)
      .then((data) => {
        console.log('summary data: ', data.data[0]);
        return this.setState({
          summary: data.data[0]
        })
      });
    requests.get(aggReviewService)
      .then((data) => {
        console.log('aggregate review data: ', data.data[0]);
        return this.setState({
          aggReviews: data.data[0]
        })
      });
  }

  render() {
    console.log('== MODAL BOOK DATA ==>', this.props.book)
    return (
      <div id='also-enjoyed-modal' style={{left:`${this.props.modalLeft}px`}}>
        <div className='also-enjoyed-modal-title-container'>
          <h2 className='also-enjoyed-modal-title'>{this.props.book.title}</h2>
          {this.props.book.subtitle &&
            <h3 className='also-enjoyed-modal-subtitle'>{this.props.book.subtitle}</h3>
          }
        </div>
        <div className='also-enjoyed-modal-meta-container'>
          <h5 className='also-enjoyed-modal-meta'>By: {this.props.book.author}</h5>
          <h5 className='also-enjoyed-modal-meta'>Narrated by: {this.props.book.narrator}</h5>
          <h5 className='also-enjoyed-modal-meta'>Length: {this.props.book.length.split(':')[0]} hrs and {this.props.book.length.split(':')[1]} mins</h5>
          <h5 className='also-enjoyed-modal-meta'>{this.props.book.version.split(' ')[0]}</h5>
        </div>
        {this.state.aggReviews &&
          <div className='also-enjoyed-modal-stars-container'>
            <div className='also-enjoyed-modal-stars'>
              Overall: {this.state.aggReviews.overall.average}STARS COMPONENT {this.state.aggReviews.overall.total}
            </div>
            <div className='also-enjoyed-modal-stars'>
              Performance: {this.state.aggReviews.performance.average}STARS COMPONENT {this.state.aggReviews.performance.total}
            </div>
            <div className='also-enjoyed-modal-stars'>
              Story: {this.state.aggReviews.story.average}STARS COMPONENT {this.state.aggReviews.story.total}
            </div>
          </div>
        }
        {this.state.summary &&
          <p className='also-enjoyed-modal-summary'>{this.state.summary.short_summary}</p>
        }
        <hr />
        <div className='also-enjoyed-modal-review'>
          <span className='also-enjoyed-modal-stars'></span>
          <h4 className='also-enjoyed-modal-review-title'>"Review Title"</h4>
          <p className='also-enjoyed-modal-review-author'>By <em>Name</em> on mm-dd-yy</p>
        </div>
      </div>
    );
  }
}

export default Modal;