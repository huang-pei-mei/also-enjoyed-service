import React from 'react';
import requests from 'axios';
import Stars from './Stars.jsx';

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
    // const reviewsService = 'http://54.183.2.218:4001/reviews/carouselReviews';
    const reviewsService = 'http://localhost:4001/reviews/carouselReviews';
    const summaryService = `http://ec2-18-188-135-5.us-east-2.compute.amazonaws.com:1220/api/summaries/${bookId}`;
    const aggReviewService = `http://ec2-18-220-21-137.us-east-2.compute.amazonaws.com:2880/api/aggReview/${bookId}`;

    requests.post(reviewsService, {
      ids: [bookId]
    })
      .then((data) => {
        console.log('review data: ', data);
        return this.setState({
          review: data.data[0]
        })
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

  formatDate(date) {
    let inputDate = new Date(date);
    return `${String(inputDate.getMonth() + 1).padStart(2,'0')}-${String(inputDate.getDate()).padStart(2,'0')}-${String(inputDate.getYear()).substr(0,2)}`;
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
              Overall: <span className='also-enjoyed-modal-stars-count'><Stars average={this.state.aggReviews.overall.average} /> {this.state.aggReviews.overall.total}</span>
            </div>
            <div className='also-enjoyed-modal-stars'>
              Performance: <span className='also-enjoyed-modal-stars-count'><Stars average={this.state.aggReviews.performance.average} /> {this.state.aggReviews.performance.total}</span>
            </div>
            <div className='also-enjoyed-modal-stars'>
              Story: <span className='also-enjoyed-modal-stars-count'><Stars average={this.state.aggReviews.story.average} /> {this.state.aggReviews.story.total}</span>
            </div>
          </div>
        }
        {this.state.summary &&
          <p className='also-enjoyed-modal-summary'>{this.state.summary.short_summary}</p>
        }
        <hr />
        {this.state.review &&
          <div className='also-enjoyed-modal-review'>
            <span className='also-enjoyed-modal-stars'></span>
            <h4 className='also-enjoyed-modal-review-title'>{`"${this.state.review.reviewTitle}"`}</h4>
            <p className='also-enjoyed-modal-review-author'>By <em>{this.state.review.reviewerName}</em> on {this.formatDate(this.state.review.date)}</p>
          </div>
        }
      </div>
    );
  }
}

export default Modal;